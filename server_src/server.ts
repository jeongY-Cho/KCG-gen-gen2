import app from "./app"
import models, { sequelize } from "./models"

// reinstantiate database (ignored in prod, and testing)
let force = true

switch (process.env.NODE_ENV) {
  case "PRODUCTION": {
    force = false
  }
  case "TESTING": {
    force = true
  }
}

// initialize database connection
sequelize.sync({ force: force }).then(async () => {
  if (force) {
    await createMockData()
  }

  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  })
})

async function createMockData() {
  // @ts-ignore
  let user1 = await models.User.create(
    {
      username: "test1",
      fullName: "first last",
      firstName: "first",
      lastName: "last",
      middleName: "middle",
      email: "123@123.com",
      authenticationLevel: 0,

    })
  // @ts-ignore
  let user2 = await models.User.create(
    {
      username: "test2",
      fullName: "Johnny Applesasdfeed",
      firstName: "Johnnasdy",
      lastName: "Applasdfeseed",
      email: "123@1asdf23.com",
      authenticationsLevel: 0,

    })

  // @ts-ignore
  let update = await models.Update.create({
    type: "rhetoric",
    oldGrade: "B",
    newGrade: "A"
  })

  // @ts-ignore
  let leg = await models.Legislator.create(
    {
      fullName: "Joe Shmoe",
      firstName: "Joe",
      lastName: "Shmoe",
      title: "SENATOR",
      district: 4,
      session: 72,
      party: "REPUBLICAN",
      imgLink: "http://leg.colorado.gov/sites/default/files/styles/width_300/public/2019a_arndt%2C%20jeni.jpg?itok=x-tF-KT0",
      grades: [
        {
          type: "rhetoric",
          grade: "F"
        },
        {
          type: "donation",
          grade: "A"
        },
        {
          type: "voting",
          grade: "C"
        }
      ]
    }
  )
  // @ts-ignore
  let grade1 = await models.Grade.create({
    type: "rhetoric",
    grade: "A"
  })
  // @ts-ignore
  let grade2 = await models.Grade.create({
    type: "donation",
    grade: "F"
  })
  // @ts-ignore
  let grade3 = await models.Grade.create({
    type: "voting",
    grade: "F"
  })

  // await update.set("legislatorId", user.get(""))
  await grade1.set("legislatorId", leg.get('id'))
  await grade1.set("setterId", user1.get('id'))
  await grade1.save()

  await grade2.set("legislatorId", leg.get('id'))
  await grade2.set("setterId", user2.get('id'))
  await grade2.save()

  await grade3.set("legislatorId", leg.get('id'))
  await grade3.set("setterId", user1.get('id'))
  await grade3.save()

  await update.set("userId", user1.get("id"))
  await update.set("legislatorId", leg.get("id"))
  await update.save()


}