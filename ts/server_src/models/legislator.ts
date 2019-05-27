export default (sequelize, DataTypes) => {
  const Legislator = sequelize.define("legislator", {
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
    title: {
      type: DataTypes.ENUM("SENATOR", "REPRESENTATIVE"),
      allowNull: false
    },
    district: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    party: {
      type: DataTypes.ENUM("DEMOCRAT", "REPUBLICAN", "INDEPENDENT"),
      allowNull: false
    },
  })
  Legislator.associate = models => {
    Legislator.hasMany(models.Grade)
  }

  return Legislator
}