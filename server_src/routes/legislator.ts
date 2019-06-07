import { Router } from "express";
import db from "./../models";

const router = Router();

router.get("/search", async (req, res) => {
  console.log(req.query);

  // @ts-ignore
  return res.send(
    await db.sequelize.models.Legislator.findAll({
      where: req.query,
      include: [
        {
          model: db.sequelize.models.Grade,
          order: [[db.sequelize.models.Grade, "type"]]
        }
      ]
    })
  );
});

router.get("/", async (req, res) => {
  // @ts-ignore
  return res.send(
    await db.sequelize.models.Legislator.findOne({
      where: req.query,
      include: [
        {
          model: db.sequelize.models.Grade,
          order: [[db.sequelize.models.Grade, "type"]],
          include: [
            {
              model: db.sequelize.models.User,
              as: "setter"
            }
          ]
        },
        {
          model: db.sequelize.models.User,
          as: "updatedBy"
        }
      ]
    })
  );
});

router.get("/:id", async (req, res) => {
  // @ts-ignore
  return res.send(
    await db.sequelize.models.Legislator.findOne({
      where: req.params.id,
      include: [
        {
          model: db.sequelize.models.Grade,
          order: [[db.sequelize.models.Grade, "type"]],
          include: [
            {
              model: db.sequelize.models.User,
              as: "setter"
            },
            { model: db.sequelize.models.User, as: "updatedBy" }
          ]
        }
      ]
    })
  );
});

router.post("/new", async (req, res) => {
  // @ts-ignore

  let {
    firstName,
    middleName,
    lastName,
    title,
    session,
    party,
    imgLink,
    email,
    legPage,
    phoneNum,
    notes,
    grades
  } = req.body;
  // @ts-ignore set leg data
  let newLeg = await db.sequelize.models.Legislator.create({
    updatedBy: req.session.user.id,
    fullName: `${firstName ? firstName + " " : ""}${
      middleName ? middleName.substring(0, 1) + ". " : ""
    }${lastName}`,
    firstName,
    middleName,
    lastName,
    title,
    session,
    party,
    imgLink,
    email,
    legPage,
    phoneNum,
    notes
  });

  // set grades
  for (let grade of grades) {
    // @ts-ignore new grade model
    let newGrade = await db.sequelize.models.Grade.create({
      type: grade.type,
      grade: grade.grade,
      legislatorId: newLeg.get("id"),
      setterId: req.session.user.id
    });
  }
  // @ts-ignore
  return res.send(
    await db.sequelize.models.Legislator.findOne({
      where: { id: newLeg.get("id") },
      include: [
        {
          model: db.sequelize.models.Grade,
          order: [[db.sequelize.models.Grade, "type"]],
          include: [{ model: db.sequelize.models.User, as: "setter" }]
        },
        {
          model: db.sequelize.models.User,
          as: "updatedBy"
        }
      ]
    })
  );
});

router.put("/:id", async (req, res) => {
  console.log(req.body);

  // @ts-ignore
  let leg = await db.sequelize.models.Legislator.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.sequelize.models.Grade,
        order: [[db.sequelize.models.Grade, "type"]],
        include: [{ model: db.sequelize.models.User, as: "setter" }]
      },
      {
        model: db.sequelize.models.User,
        as: "updatedBy"
      }
    ]
  });
  console.log(req.body);

  let {
    id,
    firstName,
    middleName,
    lastName,
    grades,
    createdAt,
    updatedAt,
    ...rest
  } = req.body;

  // set new first name
  await leg.set("firstName", firstName);
  await leg.set("middleName", middleName);
  await leg.set("lastName", lastName);
  await leg.set(
    "fullName",
    `${firstName ? firstName + " " : ""}${
      middleName ? middleName.substring(0, 1) + ". " : ""
    }${lastName}`
  );

  // set grades
  for (let gradeUpdate of grades) {
    let { type, grade } = gradeUpdate;
    // @ts-ignore
    let gradeModel = await db.sequelize.models.Grade.findOne({
      where: {
        type: type,
        legislatorId: req.params.id
      }
    });
    // if changed set grade, new update
    if (grade !== gradeModel.get("grade")) {
      let oldGrade = gradeModel.get("grade");
      // set grade
      await gradeModel.set("grade", grade);
      // set who updated
      await gradeModel.set("setterId", req.session.user.id);
      await gradeModel.save();

      // @ts-ignore new update
      await db.sequelize.models.Update.create({
        type: type,
        oldGrade: oldGrade,
        newGrade: grade,
        userId: req.session.user.id,
        legislatorId: leg.get("id")
      });
    }
  }
  // set updated key values
  for (let [key, value] of Object.entries(rest)) {
    // @ts-ignore
    if (value === "") {
      // @ts-ignore
      value = null;
    }
    console.log(key, value);
    await leg.set(key, value);
  }
  // set who updated
  await leg.set("updatedById", req.session.user.id);
  // save leg
  await leg.save();

  // @ts-ignore return updated leg and grades
  return res.send(
    await db.sequelize.models.Legislator.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.sequelize.models.Grade,
          order: [[db.sequelize.models.Grade, "type"]],
          include: [{ model: db.sequelize.models.User, as: "setter" }]
        },
        {
          model: db.sequelize.models.User,
          as: "updatedBy"
        }
      ]
    })
  );
});

router.delete("/:id", async (req, res) => {
  try {
    await db.sequelize.models.Legislator.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
