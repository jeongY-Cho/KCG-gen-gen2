import { Sequelize } from "sequelize";
import "dotenv/config"

const host = (process.env.PGHOST as string)
const URI = (process.env.DATABASE_URL as string)

export const sequelize = new Sequelize(URI, {
  host: host,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true
  }
})

sequelize.authenticate()
  .catch((err: Error) => {
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