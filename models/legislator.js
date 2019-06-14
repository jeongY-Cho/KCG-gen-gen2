"use strict";
module.exports = (sequelize, DataTypes) => {
  const Legislator = sequelize.define(
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
      notes: DataTypes.TEXT,
      lastGenerated: DataTypes.DATE
    },
    {}
  );
  Legislator.associate = function(models) {
    // associations can be defined here
    Legislator.hasMany(models.Grade, {
      onDelete: "CASCADE",
      constraint: true
    });
    Legislator.hasMany(models.Update, { constraint: false });
    Legislator.belongsTo(models.User, {
      constraint: false
    });
  };
  return Legislator;
};
