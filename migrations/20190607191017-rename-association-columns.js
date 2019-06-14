"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn("Legislators", "userId", "UserId", {
          transaction: t
        }),
        queryInterface.renameColumn("Grades", "legislatorId", "LegislatorId", {
          transaction: t
        }),
        queryInterface.renameColumn("Grades", "userId", "UserId", {
          transaction: t
        }),
        queryInterface.renameColumn("Updates", "legislatorId", "LegislatorId", {
          transaction: t
        }),
        queryInterface.renameColumn("Updates", "userId", "UserId", {
          transaction: t
        })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn("Legislators", "UserId", "userId", {
          transaction: t
        }),
        queryInterface.renameColumn("Grades", "LegislatorId", "legislatorId", {
          transaction: t
        }),
        queryInterface.renameColumn("Grades", "UserId", "userId", {
          transaction: t
        }),
        queryInterface.renameColumn("Updates", "LegislatorId", "legislatorId", {
          transaction: t
        }),
        queryInterface.renameColumn("Updates", "UserId", "userId", {
          transaction: t
        })
      ]);
    });
  }
};
