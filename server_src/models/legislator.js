"use strict";
module.exports = (sequelize, DataTypes) => {
  const legislator = sequelize.define(
    "Legislator",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      middleName: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      title: {
        type: DataTypes.ENUM("SENATOR", "REPRESENTATIVE"),
        allowNull: false
      },
      session: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      district: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      party: {
        type: DataTypes.ENUM("DEMOCRAT", "REPUBLICAN", "INDEPENDENT"),
        allowNull: false
      },
      imgLink: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      legPage: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      phoneNum: {
        type: DataTypes.STRING
      },
      notes: DataTypes.TEXT
    },
    {}
  );
  legislator.associate = function(models) {
    // associations can be defined here
    legislator.hasMany(models.Grade);
    legislator.hasMany(models.Update, { constraint: false });
    legislator.belongsTo(models.User, {
      as: "updatedBy",
      constraint: false
    });
  };
  return legislator;
};
