"use strict";
module.exports = function (sequelize, DataTypes) {
    var grade = sequelize.define("Grade", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {});
    grade.associate = function (models) {
        // associations can be defined here
        grade.belongsTo(models.Legislator, { as: "legislator" });
        grade.belongsTo(models.User, { as: "setter" });
    };
    return grade;
};
