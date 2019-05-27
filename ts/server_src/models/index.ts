import { Sequelize } from "sequelize";
import "dotenv/config"

const database = (process.env.PGDATABASE as string)
const username = (process.env.PGUSER as string)
const password = (process.env.PGPASSWORD as string)
const host = (process.env.PGHOST as string)

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
})

sequelize.authenticate()
  .catch((err) => {
    console.error(err)
  })

const models = {
  User: sequelize.import("./user"),
  Legislator: sequelize.import("./legislator"),
  Update: sequelize.import("./update"),
  Grade: sequelize.import("./grade")
}

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models)
  }
})

export default models