"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Legislators", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            middleName: {
                type: Sequelize.STRING,
                defaultValue: ""
            },
            title: {
                type: Sequelize.ENUM("SENATOR", "REPRESENTATIVE"),
                allowNull: false
            },
            session: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            district: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            party: {
                type: Sequelize.ENUM("DEMOCRAT", "REPUBLICAN", "INDEPENDENT"),
                allowNull: false
            },
            imgLink: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true
                }
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            },
            legPage: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true
                }
            },
            phoneNum: {
                type: Sequelize.STRING
            },
            notes: Sequelize.TEXT,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("legislators");
    }
};
