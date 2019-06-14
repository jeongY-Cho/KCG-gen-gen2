import { Router } from "express";
import { join } from "path";

const db = require(join(process.cwd(), "/models"));

const router = Router();

router.get("/search", async (req, res) => {
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
        db.sequelize.models.User,
        {
          model: db.sequelize.models.Grade,
          include: [db.sequelize.models.User]
        },
        {
          model: db.sequelize.models.Update,
          include: [db.sequelize.models.User]
        }
      ],
      order: [[db.sequelize.models.Grade, "type"]]
    })
  );
});

router.get("/:id", async (req, res) => {
  // @ts-ignore
  return res.send(
    await db.sequelize.models.Legislator.findOne({
      where: { id: req.params.id },
      include: [
        db.sequelize.models.User,
        {
          model: db.sequelize.models.Grade,
          include: [db.sequelize.models.User]
        },
        {
          model: db.sequelize.models.Update,
          include: [db.sequelize.models.User]
        }
      ],
      order: [[db.sequelize.models.Grade, "type"]]
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
    district,
    legPage,
    phoneNum,
    notes,
    Grades
  } = req.body;
  // @ts-ignore set leg data
  var newLeg: any;
  try {
    await db.sequelize.transaction(async t => {
      newLeg = await db.sequelize.models.Legislator.create(
        {
          updatedBy: req.session.user.id,
          fullName: `${firstName ? firstName + " " : ""}${
            middleName ? middleName.substring(0, 1) + ". " : ""
          }${lastName}`,
          firstName,
          middleName,
          lastName,
          title,
          district,
          session,
          party,
          imgLink,
          email,
          legPage,
          phoneNum,
          notes,
          UserId: req.session.user.id
        },
        { transaction: t }
      );
      // set grades
      if (!Grades || !Grades.length) {
        Grades = ["Rhetoric", "Donation", "Voting"].map(type => ({ type }));
      }
      for (let grade of Grades) {
        // @ts-ignore new grade model
        await db.sequelize.models.Grade.create(
          {
            type: grade.type,
            grade: grade.grade,
            LegislatorId: newLeg.get("id"),
            UserId: req.session.user.id
          },
          { transaction: t }
        );
      }
      // @ts-ignore
    });
    res.send(
      await db.sequelize.models.Legislator.findOne({
        where: { id: newLeg.get("id") },
        include: [
          {
            model: db.sequelize.models.Grade,
            order: [[db.sequelize.models.Grade, "type"]],
            include: [db.sequelize.models.User]
          },
          {
            model: db.sequelize.models.User
          }
        ],
        order: [[db.sequelize.models.Grade, "type"]]
      })
    );
  } catch (err) {
    if (
      err.name === "SequelizeDatabaseError" &&
      err.parent.routine === "enum_in"
    ) {
      return res.status(400).send({
        error: err,
        reason:
          "INVALID GRADES. GRADES MUST BE OF ENUM('A', 'B', 'C', 'D', 'F')"
      });
    } else {
      console.log(err);

      return res.status(400).send({ error: err, reason: "CHECK ERROR" });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    var leg = await db.sequelize.models.Legislator.findOne({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    res
      .status(400)
      .send({ error: err, reason: `NO LEGS WITH ID: ${req.params.id} FOUND` });
  }

  await db.sequelize.transaction(async (t: object) => {
    let {
      Grades,
      createdAt,
      updatedAt,
      User,
      Updates,
      UserId,
      ...others
    } = req.body;

    for (let [key, value] of Object.entries(others)) {
      try {
        await leg.set(key, value);
      } catch (err) {
        res
          .status(400)
          .send({ error: err, reason: `INVALID INPUT FOR ${key}` });
      }
    }

    let middleName = req.body.middleName || leg.get("middleName");
    await leg.set(
      "fullName",
      `${req.body.firstName ? req.body.firstName + " " : ""}${
        middleName ? middleName.substring(0, 1) + ". " : ""
      }${req.body.lastName || leg.get("lastName")}`
    );

    await leg.save({ transaction: t });

    for (let [type, newGrade] of Object.entries(Grades || {})) {
      let [ModelToUpdate] = await db.sequelize.models.Grade.findOrCreate({
        where: {
          LegislatorId: leg.get("id"),
          type
        },
        defaults: {
          LegislatorId: leg.get("id"),
          UserId: req.session.user.id,
          type,
          grade: newGrade
        }
      });

      let oldGrade = ModelToUpdate.get("grade");
      if (newGrade === "∅") {
        newGrade = null;
      }
      await ModelToUpdate.update({ grade: newGrade }, { transaction: t });
      if (newGrade !== oldGrade) {
        await db.sequelize.models.Update.create(
          {
            type: type,
            oldGrade,
            newGrade,
            UserId: req.session.user.id,
            LegislatorId: leg.get("id")
          },
          { transaction: t }
        );
      }
    }
  });
  res.sendStatus(200);
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
