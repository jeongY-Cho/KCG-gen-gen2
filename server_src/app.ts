import Express, { NextFunction } from "express";
import "dotenv/config";
import { join } from "path";
const db = require(join(process.cwd(), "/models"));
import routes from "./routes";
import path from "path";
import session from "express-session";

import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "kcg-legislator-report-card",
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
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
export let authCheck = (req, res, next) => {
  console.log(req.method);
  console.log("session", req.session);
  console.log("headers", req.headers);
  if (req.method !== "GET") {
    if (req.session.isLoggedIn) {
      next();
    } else if (req.originalUrl === "/api/user/new") {
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
  if (process.env.NODE_ENV === "DEVELOPMENT" && req.headers.bypass) {
    let user = await db.sequelize.models.User.findOne();
    req.session.isLoggedIn = true;
    req.session.user = user;
    return res.status(200).send(user);
  }
  try {
    var decodedToken = await admin.auth().verifyIdToken(req.body.token);
  } catch (err) {
    return res.status(400).send("Invalid Token");
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
