
export default (sequelize, DataTypes) => {
  const Update = sequelize.define("update", {
    oldData: {
      type: DataTypes.JSON,
      allowNull: false
    },
    newData: {
      type: DataTypes.JSON,
      allowNull: false
    }
  })

  Update.associate = models => {
    Update.belongsTo(models.User, { as: "updatedBy" }),
      Update.hasOne(models.Legislator, { as: "for" })
  }
  return Update
}