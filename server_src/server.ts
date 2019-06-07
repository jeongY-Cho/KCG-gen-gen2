import app from "./app";
import db from "./models";

// reinstantiate database (ignored in prod, and testing)
let force = false;

switch (process.env.NODE_ENV) {
  case "PRODUCTION": {
    force = false;
  }
  case "TESTING": {
    force = true;
  }
}

console.log(db);

// initialize database connection
db.sequelize.sync({ force: force }).then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
