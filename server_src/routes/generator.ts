import { Router } from "express";
import rateLimit from "express-rate-limit";
import { join } from "path";

const db = require(join(process.cwd(), "/models"));
import generator from "../generator";
import { IReportCardData } from "../generator/generator";
import { createWriteStream } from "fs";

const router = Router();

// @ts-ignore
router.use(
  // @ts-ignore
  rateLimit({
    max: 100,
    headers: true,
    handler: (req, res, next) => {
      if (req.session.isLoggedIn) {
        next();
      } else {
        res.staus(429).send("Too many requests, please try again later.");
      }
    }
  })
);

// generate with query
router.get("/", async (req, res) => {
  let { session, title, district, id } = req.query;

  try {
    var { reportCard, fileName } = await getReportCard(
      session,
      title,
      district,
      id
    );
  } catch (err) {
    return res.status(400).send({
      error: err,
      reason: `No Legislator with specified queries found. Queries: ${JSON.stringify(
        req.query
      )}`
    });
  }
  res.set("Content-disposition", "inline; filename=" + fileName);
  res.set("Content-Type", "image/jpeg");
  res.set("X-suggested-filename", fileName);
  return res.send(reportCard);
});

// generate with params in url
router.get("/:session/:title/:district", async (req, res) => {
  let { session, title, district } = req.params;

  try {
    var { reportCard, fileName } = await getReportCard(
      session,
      title,
      district
    );
  } catch (err) {
    return res.status(400).send({
      error: err,
      reason: `No Legislator with specified queries found. Queries: ${JSON.stringify(
        req.params
      )}`
    });
  }

  res.set("Content-disposition", "attachment; filename=" + fileName);
  res.set("X-suggested-filename", fileName);
  res.set("Content-Type", "image/jpeg");
  return res.send(reportCard);
});

function setFileName(
  name: string,
  session: number,
  title: string,
  district: number
) {
  return (
    name
      .split(" ")
      .join("_")
      .split(".")
      .join("_") +
    "_" +
    session +
    title.substring(0, 3).toLowerCase() +
    district +
    ".jpeg"
  );
}

router.get("/raw", async (req, res) => {
  let {
    name,
    district,
    Rhetoric,
    Voting,
    Donation,
    title,
    imgLink,
    session
  } = req.query;

  if (name && district && Rhetoric && Voting && Donation && imgLink) {
    let grades = {
      Rhetoric,
      Voting,
      Donation
    };
    let data: IReportCardData = {
      name,
      imgLink,
      title,
      grades,
      session,
      district
    };

    let reportCard = await generator.makeReportCard(data);
    let fileName = setFileName(name, session, title, district);

    res.set("Content-disposition", "attachment; filename=" + fileName);
    res.set("X-suggested-filename", fileName);
    res.set("Content-Type", "image/jpeg");
    return res.send(reportCard);
  } else {
    res
      .status(400)
      .send(
        "query must include name, district, Rhetoric, Voting, Donation, imgLink, title, and session"
      );
  }
});

async function getReportCard(
  session: number,
  title: string,
  district: number,
  id?: any
) {
  if (id) {
    var leg = await db.sequelize.models.Legislator.findOne({
      where: {
        id: id
      },
      include: [db.sequelize.models.Grade]
    });
  } else {
    var leg = await db.sequelize.models.Legislator.findOne({
      where: {
        session,
        title,
        district
      },
      include: [db.sequelize.models.Grade]
    });
  }

  var data: IReportCardData = {
    imgLink: leg.get("imgLink"),
    title: leg.get("title"),
    name: leg.get("fullName"),
    district: leg.get("district"),
    session: leg.get("session"),
    // @ts-ignore
    grades: {}
  };

  for (let grade of leg.get("Grades")) {
    let type = grade.get("type");
    let score = grade.get("grade");
    data.grades[type] = score || "";
  }

  let fileName = setFileName(
    data.name,
    data.session,
    data.title,
    data.district
  );
  let reportCard = await generator.makeReportCard(data);
  console.log(reportCard);

  await leg.set("lastGenerated", new Date());
  await leg.save();
  return { reportCard, fileName };
}

export default router;
