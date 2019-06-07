import Express, { NextFunction } from "express";
import "dotenv/config";
import db from "./models";
import routes from "./routes";
import path from "path";
import session from "express-session";

import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "kcg-legislator-report-card",
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail:
      "firebase-adminsdk-hnddn@kcg-legislator-report-card.iam.gserviceaccount.com"
  }),
  databaseURL: "https://kcg-legislator-report-card.firebaseio.com"
});

const app: Express.Application = Express();

// serve static files
app.use(Express.static(path.join(__dirname, "../client")));

//middleware to get body
app.use(
  session({
    secret: "whatwhy",
    saveUninitialized: false,
    resave: true
  })
);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// middleware for auth check on not GET requests
let authCheck = (req, res, next) => {
  console.log(req.method);
  if (req.method !== "GET") {
    if (req.session.isLoggedIn) {
      next();
    } else {
      return res.sendStatus(401);
    }
  } else {
    next();
  }
};

// route for api
app.use("/api/user", authCheck, routes.user);
app.use("/api/leg", authCheck, routes.leg);

app.use("/generator", routes.generator);

app.post("/login", async (req, res) => {
  let decodedToken: admin.auth.DecodedIdToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(req.body);
  } catch (err) {
    return res.send(400).send("Invalid Token");
  }

  // @ts-ignore
  let user = await db.sequelize.models.User.findOne({
    where: {
      uid: decodedToken.uid
    }
  });

  if (user) {
    req.session.user = user;
    req.session.isLoggedIn = true;
    return res.status(200).send(user);
  } else {
    return res.status(400).send("No such User");
  }
});

app.post("/logout", async (req, res) => {
  await req.session.destroy();
  return res.status(200).send("Logged out");
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "../client/index.html"));
});

export default app;
