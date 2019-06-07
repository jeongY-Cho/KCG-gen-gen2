import { Router } from "express";
import rateLimit from "express-rate-limit";
import db from "./../models";
import generator from "../generator";
import { IReportCardData } from "../generator/generator";

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

router.get("/", async (req, res) => {
  // @ts-ignore
  let leg = await models.Legislator.findOne({
    where: req.query,
    include: [db.sequelize.models.Grade]
  });
  console.log(leg);

  var data: IReportCardData = {
    imgLink: leg.get("imgLink"),
    title: leg.get("title"),
    updatedAt: leg.get("updatedAt"),
    name: leg.get("fullName"),
    district: leg.get("district"),
    // @ts-ignore
    grades: {}
  };

  for (let grade of leg.get("grades")) {
    let type = grade.get("type");
    let score = grade.get("grade");
    data.grades[type] = score;
  }

  let fileName = setFileName(
    data.name,
    leg.get("session"),
    data.title,
    data.district
  );
  console.log(fileName);

  if (leg) {
    res.set("Content-disposition", "inline; filename=" + fileName);
    res.set("Content-Type", "image/jpeg");
    res.set("X-suggested-filename", fileName);
    return res.send(await generator.makeReportCard(data));
  } else {
    return res
      .status(400)
      .send({ reason: "No Legislator with specified queries found" });
  }
});

router.get("/:session/:title/:district", async (req, res) => {
  let { session, title, district } = req.params;

  let data = await getReportCard(session, title, district);

  let fileName = setFileName(
    data.name,
    data.session,
    data.title,
    data.district
  );
  res.set("Content-disposition", "attachment; filename=" + fileName);
  res.set("X-suggested-filename", fileName);
  res.set("Content-Type", "image/jpeg");
  return res.send(await generator.makeReportCard(data));
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

async function getReportCard(session: number, title: string, district: number) {
  //@ts-ignore
  let leg = await models.Legislator.findOne({
    where: {
      session,
      title,
      district
    },
    include: [db.sequelize.models.Grade]
  });

  console.log(leg.get("grades")[0].get("type"));

  var data: IReportCardData = {
    imgLink: leg.get("imgLink"),
    title: leg.get("title"),
    updatedAt: leg.get("updatedAt"),
    name: leg.get("fullName"),
    district: leg.get("district"),
    session: leg.get("session"),
    // @ts-ignore
    grades: {}
  };

  for (let grade of leg.get("grades")) {
    let type = grade.get("type");
    let score = grade.get("grade");
    data.grades[type] = score;
  }

  return data;
}

export default router;
