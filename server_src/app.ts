import Express from "express";
import "dotenv/config"
import models, { sequelize } from "./models";
import update from "./models/update";
import routes from "./routes"
import bodyParser = require("body-parser");
import path from "path"

const app: Express.Application = Express()

console.log(path.join(__dirname, "../client"));


// serve static files
app.use(Express.static(path.join(__dirname, "../client")))


//middleware to get body
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// middleware to assign user 
app.use(async (req, res, next) => {
    // @ts-ignore
    req.user = await models.User.findOne({
        where: {
            username: "Mock_1"
        }
    })
    next()
})

// route for user endpoint 
app.use("/api/user", routes.user)
app.use("/api/leg", routes.leg)

app.get("/", (req, res) => {
    console.log(__dirname);
    console.log(process.env.PWD);

    return res.sendFile(path.join(__dirname, "../client/index.html"))
})


// initialize database connection
let force = false

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
            username: "Mock_1",
            fullName: "Johnny Appleseed",
            firstName: "Johnny",
            lastName: "Appleseed",
            email: "123@123.com",
            authenticationLevel: 0,

        })
    // @ts-ignore
    let user2 = await models.User.create(
        {
            username: "Mock_2",
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
            party: "REPUBLICAN",
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
    await grade1.set("userId", user1.get('id'))
    await grade1.save()

    await grade2.set("legislatorId", leg.get('id'))
    await grade2.set("userId", user2.get('id'))
    await grade2.save()

    await grade3.set("legislatorId", leg.get('id'))
    await grade3.set("userId", user1.get('id'))
    await grade3.save()

    await update.set("userId", user1.get("id"))
    await update.set("legislatorId", leg.get("id"))
    await update.save()


}