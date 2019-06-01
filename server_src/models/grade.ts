export default (sequelize, DataTypes) => {
  const Grade = sequelize.define("grade", {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  Grade.associate = models => {
    Grade.belongsTo(models.Legislator, { as: "legislator" })
    Grade.belongsTo(models.User, { as: "setter" })
  }
  return Grade
}