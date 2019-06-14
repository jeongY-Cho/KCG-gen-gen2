"use strict";
module.exports = (sequelize, DataTypes) => {
  const grade = sequelize.define(
    "Grade",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  grade.associate = function(models) {
    // associations can be defined here
    grade.belongsTo(models.Legislator, { onDelete: "CASCADE" });
    grade.belongsTo(models.User);
  };
  return grade;
};
