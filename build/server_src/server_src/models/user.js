"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                not: [" ", "i"]
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        authLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            allowNull: false
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
        User.hasMany(models.Grade, { as: "setter" });
    };
    return User;
});
