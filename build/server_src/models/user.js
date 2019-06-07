"use strict";
module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                not: [" ", "i"]
            }
        },
        uid: {
            type: DataTypes.STRING
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
    }, {});
    user.associate = function (models) {
        // associations can be defined here
        user.hasMany(models.Update);
        user.hasMany(models.Grade, { as: "setter" });
    };
    return user;
};
