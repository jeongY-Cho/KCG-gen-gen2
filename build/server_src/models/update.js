"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Update = sequelize.define("update", {
        oldData: {
            type: DataTypes.JSON,
            allowNull: false
        },
        newData: {
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    Update.associate = function (models) {
        Update.belongsTo(models.User, { as: "updatedBy" });
    };
    return Update;
});
