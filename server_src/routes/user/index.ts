import { Router } from "express";
import { join } from "path";
import * as admin from "firebase-admin";
const db = require(join(process.cwd(), "/models"));

const router = Router();

router.get("/me", (req, res) => {
  // @ts-ignore
  if (req.session.isLoggedIn) {
    return res.json(req.session.user);
  } else {
    return res.sendStatus(401);
  }
});

router.put("/me", async (req, res) => {
  // @ts-ignore
  let user = await db.sequelize.models.user.findOne({
    where: {
      // @ts-ignore
      username: req.session.user.username
    }
  });

  try {
    for (let [key, value] of Object.entries(req.body)) {
      await user.set(key, value);
    }
    let updatedUser = await user.save();
    return res.send(updatedUser);
  } catch (err) {
    return res.status(400).send(err);
  }
});

interface INewUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  token: string;
}

router.post("/new", async (req, res) => {
  console.log(req.body);
  let {
    username,
    email,
    firstName,
    lastName,
    middleName,
    token
  } = req.body as INewUser;

  if (!middleName) {
    middleName = "";
  }
  let fullName = `${firstName ? firstName + " " : ""}${
    middleName ? middleName.substring(0, 1) + ". " : ""
  }${lastName}`;

  let decodedToken = await admin.auth().verifyIdToken(token);
  try {
    // @ts-ignore
    let newUser = await db.sequelize.models.User.create({
      username,
      fullName,
      email,
      firstName,
      lastName,
      middleName,
      uid: decodedToken.uid
    });
    return res.send(newUser);
  } catch (err) {
    console.log(err);

    return res.status(400).send(err);
  }
});

router.get("/:username", async (req, res) => {
  // @ts-ignore
  return res.send(
    await db.sequelize.models.user.findOne({
      where: {
        username: req.params.username
      },
      include: [db.sequelize.models.update]
    })
  );
});

router.put("/:username", async (req, res) => {
  try {
    var user = await db.sequelize.models.user.findOne({
      where: {
        username: req.params.username
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: err,
      reason: `NO SUCH USER WITH USERNAME: ${req.params.username}`
    });
  }

  if (req.session.user.get("authLevel") > user.get("authLevel")) {
    return res
      .status(403)
      .send({ reason: "User authentication level lower than target" });
  }

  for (let [key, value] of Object.entries(req.body)) {
    await user.set(key, value);
  }
  await user.save();

  return res.send(user);
});

export default router;
