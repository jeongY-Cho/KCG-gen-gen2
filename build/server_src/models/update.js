"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Update = sequelize.define("update", {
        type: {
            type: DataTypes.JSON,
            allowNull: false
        },
        oldGrade: {
            type: DataTypes.STRING,
        },
        newGrade: {
            type: DataTypes.STRING,
        }
    });
    Update.associate = function (models) {
        Update.belongsTo(models.User);
        Update.belongsTo(models.Legislator);
    };
    return Update;
});
