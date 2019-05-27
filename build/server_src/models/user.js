"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        authenticationLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING,
            allowNulll: false
        },
        middleName: {
            type: DataTypes.STRING
        }
    });
    User.associate = function (models) {
        User.hasMany(models.Update);
    };
    return User;
});
