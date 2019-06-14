"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeColumn("Updates", "LegislatorId");
    await queryInterface.addColumn("Updates", "LegislatorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Legislators",
        key: "id"
      },
      onDelete: "CASCADE"
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
      return queryInterface.dropTable('users');
      */
    await queryInterface.addColumn("Updates", "LegislatorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Legislators",
        key: "id"
      }
    });
  }
};
