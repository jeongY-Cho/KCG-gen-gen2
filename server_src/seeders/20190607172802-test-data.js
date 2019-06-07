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
    await queryInterface.bulkInsert("Users", [
      {
        username: "test1",
        fullName: "Joe",
        email: "test1@df.com",
        authLevel: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "test2",
        fullName: "Joe",
        email: "test2@df.com",
        authLevel: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "test3",
        fullName: "Joe",
        email: "test3@df.com",
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
        userId: userRows[1].id
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
        userId: userRows[2].id
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
        userId: userRows[1].id
      }
    ]);
    const legs = await queryInterface.sequelize.query(
      `SELECT id from "Legislators"`
    );
    const legRows = legs[0];

    await queryInterface.bulkInsert("Grades", [
      {
        type: "Rhetoric",
        grade: "A",
        userId: userRows[0].id,
        legislatorId: legRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Donation",
        grade: "A",
        userId: userRows[0].id,
        legislatorId: legRows[0].id,

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Voting",
        grade: "A",
        userId: userRows[0].id,
        legislatorId: legRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    await queryInterface.bulkInsert("Updates", [
      {
        type: "Rhetoric",
        oldGrade: "F",
        newGrade: "A",
        userId: userRows[0].id,
        legislatorId: legRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
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
        queryInterface.bulkDelete("Users", null, {}),
        queryInterface.bulkDelete("Grades", null, {}),
        queryInterface.bulkDelete("Legislators", null, {}),
        queryInterface.bulkDelete("Updates", null, {})
      ]);
    });
  }
};
