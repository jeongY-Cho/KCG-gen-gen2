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
        queryInterface.addColumn(
          "Grades",
          "legislatorId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Legislators",
              key: "id"
            }
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Grades",
          "userId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id"
            }
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Updates",
          "legislatorId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Legislators",
              key: "id"
            }
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Updates",
          "userId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id"
            }
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Legislators",
          "userId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id"
            }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Grades", "legislatorId", {
          transaction: t
        }),
        queryInterface.removeColumn("Grades", "userId", { transaction: t }),
        queryInterface.removeColumn("Updates", "legislatorId", {
          transaction: t
        }),
        queryInterface.removeColumn("Updates", "userId", { transaction: t }),
        queryInterface.removeColumn("Legislators", "userId", { transaction: t })
      ]);
    });
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
