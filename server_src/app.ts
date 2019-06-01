import Express, { NextFunction } from "express";
import "dotenv/config"
import models, { sequelize } from "./models";
import routes from "./routes"
import path from "path"
import session from "express-session"

const app: Express.Application = Express()

console.log(path.join(__dirname, "../client"));


// serve static files
app.use(Express.static(path.join(__dirname, "../client")))


//middleware to get body
app.use(session({
    secret: "whatwhy",
    saveUninitialized: false,
    resave: true
}))


app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// middleware for auth check on not GET requests
let authCheck = (req, res, next) => {
    console.log(req.method);
    if (req.method !== "GET") {
        if (req.session.isLoggedIn) {
            next()
        } else {
            return res.sendStatus(401)
        }
    } else {
        next()
    }
}

// route for api 
app.use("/api/user", authCheck, routes.user)
app.use("/api/leg", authCheck, routes.leg)

app.use("/generator", routes.generator)

app.post("/login", async (req, res) => {
    // @ts-ignore
    if (req.session.isLoggedIn) {
        return res.status(200).send()
    }
    // @ts-ignore
    let user = await models.User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (user) {
        req.session.isLoggedIn = true
        req.session.user = user
        res.status(201)
        return res.send(user)
    } else {
        return res.sendStatus(400)
    }
})

app.post("/logout", async (req, res) => {
    await req.session.destroy()
    return res.sendStatus(200)
})



app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "../client/index.html"))
})


export default app
