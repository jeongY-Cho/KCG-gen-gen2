"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeColumn("Legislators", "UserId");
    await queryInterface.addColumn("Legislators", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.changeColumn("Legislators", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    });
  }
};
