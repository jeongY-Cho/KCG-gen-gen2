import { Router } from "express";
import { sequelize } from "../models"

const router = Router()

router.get("/me", (req, res) => {
  console.log(req);

  // @ts-ignore
  return res.json(req.user)
})

router.put("/me", async (req, res) => {
  console.log(req.body);

  // @ts-ignore
  let user = await sequelize.models.user.findOne({
    where: {
      // @ts-ignore
      username: req.user.username
    }
  })

  try {
    for (let [key, value] of Object.entries(req.body)) {
      await user.set(key, value)
    }
    let updatedUser = await user.save()
    return res.send(updatedUser)

  } catch (err) {
    return res.send(err)
  }
})

router.post("/new", async (req, res) => {
  console.log(req.body);
  let { username, email, authLevel, firstName, lastName, middleName } = req.body

  if (!middleName) {
    middleName = ''
  }
  let fullName = `${firstName ? firstName + " " : ''}${middleName ? middleName.substring(0, 1) + " " : ''}${lastName}`

  try {
    // @ts-ignore
    let newUser = await sequelize.models.user.create({
      username, fullName, email, authLevel, firstName, lastName, middleName
    })
    return res.send(newUser)

  } catch (err) {
    return res.send(err)
  }
})

router.get("/:username", async (req, res) => {

  // @ts-ignore
  return res.send(await sequelize.models.user.findOne({
    where: {
      username: req.params.username
    },
    include: [sequelize.models.update]
  }))
})
router.put("/:username", async (req, res) => {

  // @ts-ignore
  return res.send(await sequelize.models.user.findOne({
    where: {
      username: req.params.username
    },
    include: [sequelize.models.update]
  }))
})


export default router