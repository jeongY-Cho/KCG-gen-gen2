"use strict";
module.exports = function (sequelize, DataTypes) {
    var Update = sequelize.define("Update", {
        type: {
            type: DataTypes.JSON,
            allowNull: false
        },
        oldGrade: {
            type: DataTypes.STRING
        },
        newGrade: {
            type: DataTypes.STRING
        }
    }, {});
    Update.associate = function (models) {
        // associations can be defined here
        Update.belongsTo(models.Legislator);
        Update.belongsTo(models.User);
    };
    return Update;
};
