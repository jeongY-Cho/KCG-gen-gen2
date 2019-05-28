"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
require("dotenv/config");
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
