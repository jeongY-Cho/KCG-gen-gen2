"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
module.exports = {
    up: function (queryInterface, Sequelize) { return __awaiter(_this, void 0, void 0, function () {
        var users, userRows, legs, legRows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /*
                  Add altering commands here.
                  Return a promise to correctly handle asynchronicity.
            
                  Example:
                  return queryInterface.bulkInsert('People', [{
                    name: 'John Doe',
                    isBetaMember: false
                  }], {});
                */
                return [4 /*yield*/, queryInterface.bulkInsert("Users", [
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
                    ])];
                case 1:
                    /*
                      Add altering commands here.
                      Return a promise to correctly handle asynchronicity.
                
                      Example:
                      return queryInterface.bulkInsert('People', [{
                        name: 'John Doe',
                        isBetaMember: false
                      }], {});
                    */
                    _a.sent();
                    return [4 /*yield*/, queryInterface.sequelize.query("SELECT id from \"Users\"")];
                case 2:
                    users = _a.sent();
                    userRows = users[0];
                    return [4 /*yield*/, queryInterface.bulkInsert("Legislators", [
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
                        ])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, queryInterface.sequelize.query("SELECT id from \"Legislators\"")];
                case 4:
                    legs = _a.sent();
                    legRows = legs[0];
                    return [4 /*yield*/, queryInterface.bulkInsert("Grades", [
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
                        ])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, queryInterface.bulkInsert("Updates", [
                            {
                                type: "Rhetoric",
                                oldGrade: "F",
                                newGrade: "A",
                                userId: userRows[0].id,
                                legislatorId: legRows[0].id,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }
                        ])];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    down: function (queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.sequelize.transaction(function (t) {
            return Promise.all([
                queryInterface.bulkDelete("Users", null, {}),
                queryInterface.bulkDelete("Grades", null, {}),
                queryInterface.bulkDelete("Legislators", null, {}),
                queryInterface.bulkDelete("Updates", null, {})
            ]);
        });
    }
};
