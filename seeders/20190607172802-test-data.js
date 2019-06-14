"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.bulkInsert("Users", [
        {
          username: "test1",
          fullName: "Joe1",
          lastName: "1",
          email: "test1@ddf.com",
          authLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "test2",
          fullName: "Joe2",
          lastName: "2",
          email: "test2@asddf.com",
          authLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "test3",
          fullName: "Joe3",
          lastName: "3",
          email: "test3@dasf.com",
          authLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);

      const users = await queryInterface.sequelize.query(
        `SELECT id from "Users"`
      );

      const userRows = users[0];
      await queryInterface.bulkInsert("Legislators", [
        {
          fullName: "Leg 1",
          firstName: "Leg",
          lastName: "1",
          title: "SENATOR",
          district: 2,
          party: "DEMOCRAT",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userRows[1].id
        },
        {
          fullName: "Leg 2",
          firstName: "Leg",
          lastName: "2",
          title: "SENATOR",
          district: 4,
          party: "DEMOCRAT",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userRows[2].id
        },
        {
          fullName: "Leg 3",
          firstName: "Leg",
          lastName: "3",
          title: "SENATOR",
          district: 5,
          party: "DEMOCRAT",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userRows[1].id
        }
      ]);
      const legs = await queryInterface.sequelize.query(
        `SELECT id from "Legislators"`
      );
      const legRows = legs[0];

      await queryInterface.bulkInsert(
        "Grades",
        [
          {
            type: "Rhetoric",
            grade: "A",
            UserId: userRows[0].id,
            LegislatorId: legRows[0].id,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          },
          {
            type: "Donation",
            grade: "A",
            UserId: userRows[0].id,
            LegislatorId: legRows[0].id,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          },
          {
            type: "Voting",
            grade: "A",
            UserId: userRows[0].id,
            LegislatorId: legRows[0].id,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          }
        ],
        { transaction: t }
      );
      await queryInterface.bulkInsert(
        "Updates",
        [
          {
            type: "Rhetoric",
            oldGrade: "F",
            newGrade: "A",
            UserId: userRows[0].id,
            LegislatorId: legRows[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        { transaction: t }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete("Users", null, { transaction: t }),
        queryInterface.bulkDelete("Grades", null, { transaction: t }),
        queryInterface.bulkDelete("Legislators", null, { transaction: t }),
        queryInterface.bulkDelete("Updates", null, { transaction: t })
      ]);
    });
  }
};
