import { Router } from "express"
import rateLimit from "express-rate-limit"
import models, { sequelize } from "../models"
import generator from "../generator";
import { IReportCardData } from "../generator/generator";


const router = Router()


// @ts-ignore
router.use(rateLimit({
  max: 100,
  headers: true,
  handler: (req, res, next) => {
    if (req.session.isLoggedIn) {
      next()
    } else {
      res.staus(429).send("Too many requests, please try again later.")
    }
  }
}))

// 
router.get("/", async (req, res) => {
  // @ts-ignore
  let data = await getReportCard(...req.query)

  // @ts-ignore
  let fileName = setFileName(data.name, data.session, data.title, data.district)
  res.set('Content-disposition', 'attachment; filename=' + fileName);

  return res.send(await generator.makeReportCard(data))
})

router.get("/:id", async (req, res) => {
  // @ts-ignore
  let leg = await models.Legislator.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Grade]
  })

  var data: IReportCardData = {
    imgLink: leg.get("imgLink"),
    title: leg.get("title"),
    updatedAt: leg.get("updatedAt"),
    name: leg.get("fullName"),
    district: leg.get("district"),
    // @ts-ignore
    grades: {}
  }

  for (let grade of leg.get("grades")) {

    let type = grade.get('type')
    let score = grade.get("grade")
    data.grades[type] = score
  }

  let fileName = setFileName(data.name, leg.get("session"), data.title, data.district)
  res.set('Content-disposition', 'attachment; filename=' + fileName);
  return res.send(await generator.makeReportCard(data))
})

router.get("/:session/:title/:district", async (req, res) => {
  let { session, title, district } = req.params

  let data = await getReportCard(session, title, district)

  let fileName = setFileName(data.name, data.session, data.title, data.district)
  res.set('Content-disposition', 'attachment; filename=' + fileName);
  return res.send(await generator.makeReportCard(data))
})


function setFileName(name: string, session: number, title: string, district: number) {
  return name.split(" ").join("_").split(".").join("_") + "_" + session + title.substring(0, 3).toLowerCase() + district + ".jpeg"
}

async function getReportCard(session: number, title: string, district: number) {
  //@ts-ignore
  let leg = await models.Legislator.findOne({
    where: {
      session, title, district
    },
    include: [models.Grade]
  })

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
  }

  for (let grade of leg.get("grades")) {

    let type = grade.get('type')
    let score = grade.get("grade")
    data.grades[type] = score
  }

  return data
}



export default router