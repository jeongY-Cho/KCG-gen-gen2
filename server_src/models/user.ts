
export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
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
  })
  User.associate = models => {
    User.hasMany(models.Update)
    User.hasMany(models.Grade, { as: "setter" })
  }

  return User
}
