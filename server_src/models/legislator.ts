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
    middleName: {
      type: DataTypes.STRING,
      defaultValue: ''
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
  })
  Legislator.associate = models => {
    Legislator.hasMany(models.Grade)
    Legislator.belongsTo(models.User, { as: "updatedBy", constraint: false })
    Legislator.hasMany(models.Update, { constraint: false })
  }

  return Legislator
}

