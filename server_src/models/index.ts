import { Sequelize } from "sequelize";
import "dotenv/config"


console.log(JSON.stringify(process.env.NODE_ENV));
export var sequelize: Sequelize
if (process.env.NODE_ENV == "DEVELOPMENT") {
  console.log("asdfeffe");

  const database = (process.env.DEV_PGDATABASE as string)
  const username = (process.env.DEV_PGUSERNAME as string)
  const password = (process.env.DEV_PGPASSWORD as string)

  sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  })

} else if (process.env.NODE_ENV === "PRODUCTION") {
  const host = (process.env.PGHOST as string)
  const URI = (process.env.DATABASE_URL as string)

  sequelize = new Sequelize(URI, {
    host: host,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })
}
console.log(sequelize);

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