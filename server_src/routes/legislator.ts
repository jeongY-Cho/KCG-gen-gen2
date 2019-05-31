import { Router } from "express";
import models from "../models"

const router = Router()


router.get("/search", async (req, res) => {
  console.log(req.query);

  // @ts-ignore
  return res.send(await models.Legislator.findAll({
    where: req.query,
    include: [models.Grade]
  }))
})

router.get("/:id", async (req, res) => {
  // @ts-ignore
  return res.send(await models.Legislator.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Grade]
  }))
})

router.get("/:session/:title/:district", async (req, res) => {
  console.log(JSON.stringify(req.params));

  try {
    // @ts-ignore
    return res.send(await models.Legislator.findOne({
      where: {
        title: req.params.title,
        district: req.params.district
      },
      include: [models.Grade, models.Update]
    }))

  } catch (err) {
    console.log(err.original);

    res.status(400).send(err)

  }
})

router.post("/new", async (req, res) => {
  // @ts-ignore
  return res.send(await models.Legislator.create({
    ...req.body
  }))
})

router.put("/:id", async (req, res) => {
  // @ts-ignore
  let leg = await models.Legislator.findOne({
    where: req.params.id
  })

  for (let [key, value] of Object.entries(req.body)) {
    await leg.set(key, value)
  }
  let updatedLeg = leg.save()
  return res.send(updatedLeg)
})

router.delete("/:id", async (req, res) => {
  try {
    await models.Legislator.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.send()
  } catch (err) {
    return res.status(400).send(err)
  }
})

export default router