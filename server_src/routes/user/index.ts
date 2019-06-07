import { Router } from "express";
import db from "./../../models";

const router = Router();

router.get("/me", (req, res) => {
  console.log(req);

  // @ts-ignore
  return res.json(req.session.user);
});

router.put("/me", async (req, res) => {
  console.log(req.body);

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

router.post("/new", async (req, res) => {
  console.log(req.body);
  let {
    username,
    email,
    authLevel,
    firstName,
    lastName,
    middleName
  } = req.body;

  if (!middleName) {
    middleName = "";
  }
  let fullName = `${firstName ? firstName + " " : ""}${
    middleName ? middleName.substring(0, 1) + ". " : ""
  }${lastName}`;

  try {
    // @ts-ignore
    let newUser = await db.sequelize.models.user.create({
      username,
      fullName,
      email,
      authLevel,
      firstName,
      lastName,
      middleName
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
  // @ts-ignore
  let user = await sequelize.models.user.findOne({
    where: {
      username: req.params.username
    }
  });
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
