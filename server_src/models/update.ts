
export default (sequelize, DataTypes) => {
  const Update = sequelize.define("update", {
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
  })

  Update.associate = models => {
    Update.belongsTo(models.Legislator)
  }
  return Update
}