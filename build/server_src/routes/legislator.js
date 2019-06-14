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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var db = require(path_1.join(process.cwd(), "/models"));
var router = express_1.Router();
router.get("/search", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, db.sequelize.models.Legislator.findAll({
                        where: req.query,
                        include: [
                            {
                                model: db.sequelize.models.Grade,
                                order: [[db.sequelize.models.Grade, "type"]]
                            }
                        ]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                        where: req.query,
                        include: [
                            db.sequelize.models.User,
                            {
                                model: db.sequelize.models.Grade,
                                include: [db.sequelize.models.User]
                            },
                            {
                                model: db.sequelize.models.Update,
                                include: [db.sequelize.models.User]
                            }
                        ],
                        order: [[db.sequelize.models.Grade, "type"]]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                        where: { id: req.params.id },
                        include: [
                            db.sequelize.models.User,
                            {
                                model: db.sequelize.models.Grade,
                                include: [db.sequelize.models.User]
                            },
                            {
                                model: db.sequelize.models.Update,
                                include: [db.sequelize.models.User]
                            }
                        ],
                        order: [[db.sequelize.models.Grade, "type"]]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.post("/new", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, firstName, middleName, lastName, title, session, party, imgLink, email, district, legPage, phoneNum, notes, Grades, newLeg, _b, _c, err_1;
    var _this = this;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, title = _a.title, session = _a.session, party = _a.party, imgLink = _a.imgLink, email = _a.email, district = _a.district, legPage = _a.legPage, phoneNum = _a.phoneNum, notes = _a.notes, Grades = _a.Grades;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db.sequelize.transaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, Grades_1, grade;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db.sequelize.models.Legislator.create({
                                        updatedBy: req.session.user.id,
                                        fullName: "" + (firstName ? firstName + " " : "") + (middleName ? middleName.substring(0, 1) + ". " : "") + lastName,
                                        firstName: firstName,
                                        middleName: middleName,
                                        lastName: lastName,
                                        title: title,
                                        district: district,
                                        session: session,
                                        party: party,
                                        imgLink: imgLink,
                                        email: email,
                                        legPage: legPage,
                                        phoneNum: phoneNum,
                                        notes: notes,
                                        UserId: req.session.user.id
                                    }, { transaction: t })];
                                case 1:
                                    newLeg = _a.sent();
                                    // set grades
                                    if (!Grades || !Grades.length) {
                                        Grades = ["Rhetoric", "Donation", "Voting"].map(function (type) { return ({ type: type }); });
                                    }
                                    _i = 0, Grades_1 = Grades;
                                    _a.label = 2;
                                case 2:
                                    if (!(_i < Grades_1.length)) return [3 /*break*/, 5];
                                    grade = Grades_1[_i];
                                    // @ts-ignore new grade model
                                    return [4 /*yield*/, db.sequelize.models.Grade.create({
                                            type: grade.type,
                                            grade: grade.grade,
                                            LegislatorId: newLeg.get("id"),
                                            UserId: req.session.user.id
                                        }, { transaction: t })];
                                case 3:
                                    // @ts-ignore new grade model
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _d.sent();
                _c = (_b = res).send;
                return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                        where: { id: newLeg.get("id") },
                        include: [
                            {
                                model: db.sequelize.models.Grade,
                                order: [[db.sequelize.models.Grade, "type"]],
                                include: [db.sequelize.models.User]
                            },
                            {
                                model: db.sequelize.models.User
                            }
                        ],
                        order: [[db.sequelize.models.Grade, "type"]]
                    })];
            case 3:
                _c.apply(_b, [_d.sent()]);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _d.sent();
                if (err_1.name === "SequelizeDatabaseError" &&
                    err_1.parent.routine === "enum_in") {
                    return [2 /*return*/, res.status(400).send({
                            error: err_1,
                            reason: "INVALID GRADES. GRADES MUST BE OF ENUM('A', 'B', 'C', 'D', 'F')"
                        })];
                }
                else {
                    console.log(err_1);
                    return [2 /*return*/, res.status(400).send({ error: err_1, reason: "CHECK ERROR" })];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.put("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var leg, err_2;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                leg = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res
                    .status(400)
                    .send({ error: err_2, reason: "NO LEGS WITH ID: " + req.params.id + " FOUND" });
                return [3 /*break*/, 3];
            case 3: return [4 /*yield*/, db.sequelize.transaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, Grades, createdAt, updatedAt, User, Updates, UserId, others, _i, _b, _c, key, value, err_3, middleName, _d, _e, _f, type, newGrade, ModelToUpdate, oldGrade;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                _a = req.body, Grades = _a.Grades, createdAt = _a.createdAt, updatedAt = _a.updatedAt, User = _a.User, Updates = _a.Updates, UserId = _a.UserId, others = __rest(_a, ["Grades", "createdAt", "updatedAt", "User", "Updates", "UserId"]);
                                _i = 0, _b = Object.entries(others);
                                _g.label = 1;
                            case 1:
                                if (!(_i < _b.length)) return [3 /*break*/, 6];
                                _c = _b[_i], key = _c[0], value = _c[1];
                                _g.label = 2;
                            case 2:
                                _g.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, leg.set(key, value)];
                            case 3:
                                _g.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                err_3 = _g.sent();
                                res
                                    .status(400)
                                    .send({ error: err_3, reason: "INVALID INPUT FOR " + key });
                                return [3 /*break*/, 5];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6:
                                middleName = req.body.middleName || leg.get("middleName");
                                return [4 /*yield*/, leg.set("fullName", "" + (req.body.firstName ? req.body.firstName + " " : "") + (middleName ? middleName.substring(0, 1) + ". " : "") + (req.body.lastName || leg.get("lastName")))];
                            case 7:
                                _g.sent();
                                return [4 /*yield*/, leg.save({ transaction: t })];
                            case 8:
                                _g.sent();
                                _d = 0, _e = Object.entries(Grades || {});
                                _g.label = 9;
                            case 9:
                                if (!(_d < _e.length)) return [3 /*break*/, 14];
                                _f = _e[_d], type = _f[0], newGrade = _f[1];
                                return [4 /*yield*/, db.sequelize.models.Grade.findOrCreate({
                                        where: {
                                            LegislatorId: leg.get("id"),
                                            type: type
                                        },
                                        defaults: {
                                            LegislatorId: leg.get("id"),
                                            UserId: req.session.user.id,
                                            type: type,
                                            grade: newGrade
                                        }
                                    })];
                            case 10:
                                ModelToUpdate = (_g.sent())[0];
                                oldGrade = ModelToUpdate.get("grade");
                                if (newGrade === "∅") {
                                    newGrade = null;
                                }
                                return [4 /*yield*/, ModelToUpdate.update({ grade: newGrade }, { transaction: t })];
                            case 11:
                                _g.sent();
                                if (!(newGrade !== oldGrade)) return [3 /*break*/, 13];
                                return [4 /*yield*/, db.sequelize.models.Update.create({
                                        type: type,
                                        oldGrade: oldGrade,
                                        newGrade: newGrade,
                                        UserId: req.session.user.id,
                                        LegislatorId: leg.get("id")
                                    }, { transaction: t })];
                            case 12:
                                _g.sent();
                                _g.label = 13;
                            case 13:
                                _d++;
                                return [3 /*break*/, 9];
                            case 14: return [2 /*return*/];
                        }
                    });
                }); })];
            case 4:
                _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.sequelize.models.Legislator.destroy({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(400).send(err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
