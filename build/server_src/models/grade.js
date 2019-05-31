"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Grade = sequelize.define("grade", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Grade.associate = function (models) {
        Grade.belongsTo(models.Legislator, { as: "legislator" });
        Grade.belongsTo(models.User, { as: "setter" });
    };
    return Grade;
});
