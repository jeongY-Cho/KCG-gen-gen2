
export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authenticationLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
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
  }

  return User
}
