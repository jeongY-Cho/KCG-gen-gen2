"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
require("dotenv/config");
console.log(JSON.stringify(process.env.NODE_ENV));
if (process.env.NODE_ENV == "DEVELOPMENT") {
    console.log("asdfeffe");
    var database = process.env.DEV_PGDATABASE;
    var username = process.env.DEV_PGUSERNAME;
    var password = process.env.DEV_PGPASSWORD;
    exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    });
}
else if (process.env.NODE_ENV === "PRODUCTION") {
    var host = process.env.PGHOST;
    var URI = process.env.DATABASE_URL;
    exports.sequelize = new sequelize_1.Sequelize(URI, {
        host: host,
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: true
        }
    });
}
console.log(exports.sequelize);
exports.sequelize.authenticate()
    .catch(function (err) {
    console.error(err);
});
var models = {
    User: exports.sequelize.import("./user"),
    Legislator: exports.sequelize.import("./legislator"),
    Update: exports.sequelize.import("./update"),
    Grade: exports.sequelize.import("./grade")
};
Object.keys(models).forEach(function (key) {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});
exports.default = models;
