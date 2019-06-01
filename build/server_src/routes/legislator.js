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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var models_1 = __importDefault(require("../models"));
var router = express_1.Router();
router.get("/search", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(req.query);
                _b = (_a = res).send;
                return [4 /*yield*/, models_1.default.Legislator.findAll({
                        where: req.query,
                        include: [models_1.default.Grade]
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
                return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: req.query,
                        include: [{
                                model: models_1.default.Grade,
                                include: [{
                                        model: models_1.default.User, as: "setter"
                                    }]
                            }]
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
                return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: req.params.id,
                        include: [{
                                model: models_1.default.Grade,
                                include: [{
                                        model: models_1.default.User, as: "setter"
                                    }]
                            }]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.post("/new", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, firstName, middleName, lastName, title, session, party, imgLink, email, legPage, phoneNum, notes, grades, newLeg, _i, grades_1, grade, newGrade, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, title = _a.title, session = _a.session, party = _a.party, imgLink = _a.imgLink, email = _a.email, legPage = _a.legPage, phoneNum = _a.phoneNum, notes = _a.notes, grades = _a.grades;
                return [4 /*yield*/, models_1.default.Legislator.create({
                        updatedBy: req.session.user.id,
                        fullName: "" + (firstName ? firstName + " " : '') + (middleName ? middleName.substring(0, 1) + ". " : '') + lastName,
                        firstName: firstName, middleName: middleName, lastName: lastName, title: title, session: session, party: party, imgLink: imgLink, email: email, legPage: legPage, phoneNum: phoneNum, notes: notes
                    })
                    // set grades
                ];
            case 1:
                newLeg = _d.sent();
                _i = 0, grades_1 = grades;
                _d.label = 2;
            case 2:
                if (!(_i < grades_1.length)) return [3 /*break*/, 5];
                grade = grades_1[_i];
                return [4 /*yield*/, models_1.default.Grade.create({
                        type: grade.type,
                        grade: grade.grade,
                        legislatorId: newLeg.get("id"),
                        setterId: req.session.user.id
                    })];
            case 3:
                newGrade = _d.sent();
                _d.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _c = (_b = res).send;
                return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: { id: newLeg.get("id") },
                        include: [
                            {
                                model: models_1.default.Grade,
                                include: [{ model: models_1.default.User, as: "setter" }]
                            },
                            {
                                model: models_1.default.User,
                                as: "updatedBy"
                            }
                        ]
                    })];
            case 6: 
            // @ts-ignore
            return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
router.put("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var leg, _a, id, firstName, middleName, lastName, grades, createdAt, updatedAt, rest, _i, grades_2, gradeUpdate, type, grade, gradeModel, oldGrade, _b, _c, _d, key, value, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                console.log(req.body);
                return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: {
                            id: req.params.id
                        },
                        include: [{
                                model: models_1.default.Grade,
                                include: [{ model: models_1.default.User, as: "setter" }]
                            },
                            {
                                model: models_1.default.User,
                                as: "updatedBy"
                            }
                        ]
                    })];
            case 1:
                leg = _g.sent();
                console.log(req.body);
                _a = req.body, id = _a.id, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, grades = _a.grades, createdAt = _a.createdAt, updatedAt = _a.updatedAt, rest = __rest(_a, ["id", "firstName", "middleName", "lastName", "grades", "createdAt", "updatedAt"]);
                // set new first name
                return [4 /*yield*/, leg.set("firstName", firstName)];
            case 2:
                // set new first name
                _g.sent();
                return [4 /*yield*/, leg.set("middleName", middleName)];
            case 3:
                _g.sent();
                return [4 /*yield*/, leg.set("lastName", lastName)];
            case 4:
                _g.sent();
                return [4 /*yield*/, leg.set("fullName", "" + (firstName ? firstName + " " : '') + (middleName ? middleName.substring(0, 1) + ". " : '') + lastName)
                    // set grades 
                ];
            case 5:
                _g.sent();
                _i = 0, grades_2 = grades;
                _g.label = 6;
            case 6:
                if (!(_i < grades_2.length)) return [3 /*break*/, 13];
                gradeUpdate = grades_2[_i];
                type = gradeUpdate.type, grade = gradeUpdate.grade;
                return [4 /*yield*/, models_1.default.Grade.findOne({
                        where: {
                            type: type,
                            legislatorId: req.params.id
                        }
                    })
                    // if changed set grade, new update
                ];
            case 7:
                gradeModel = _g.sent();
                if (!(grade !== gradeModel.get("grade"))) return [3 /*break*/, 12];
                oldGrade = gradeModel.get("grade");
                // set grade
                return [4 /*yield*/, gradeModel.set("grade", grade)
                    // set who updated 
                ];
            case 8:
                // set grade
                _g.sent();
                // set who updated 
                return [4 /*yield*/, gradeModel.set("setterId", req.session.user.id)];
            case 9:
                // set who updated 
                _g.sent();
                return [4 /*yield*/, gradeModel.save()
                    // @ts-ignore new update
                ];
            case 10:
                _g.sent();
                // @ts-ignore new update
                return [4 /*yield*/, models_1.default.Update.create({
                        type: type,
                        oldGrade: oldGrade,
                        newGrade: grade,
                        userId: req.session.user.id,
                        legislatorId: leg.get("id")
                    })];
            case 11:
                // @ts-ignore new update
                _g.sent();
                _g.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 6];
            case 13:
                _b = 0, _c = Object.entries(rest);
                _g.label = 14;
            case 14:
                if (!(_b < _c.length)) return [3 /*break*/, 17];
                _d = _c[_b], key = _d[0], value = _d[1];
                // @ts-ignore
                if (value === '') {
                    // @ts-ignore
                    value = null;
                }
                console.log(key, value);
                return [4 /*yield*/, leg.set(key, value)];
            case 15:
                _g.sent();
                _g.label = 16;
            case 16:
                _b++;
                return [3 /*break*/, 14];
            case 17: 
            // set who updated
            return [4 /*yield*/, leg.set("setterId", req.session.user.id)
                // save leg
            ];
            case 18:
                // set who updated
                _g.sent();
                // save leg
                return [4 /*yield*/, leg.save()
                    // @ts-ignore return updated leg and grades 
                ];
            case 19:
                // save leg
                _g.sent();
                _f = (_e = res).send;
                return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: { id: req.params.id },
                        include: [
                            {
                                model: models_1.default.Grade,
                                include: [{ model: models_1.default.User, as: "setter" }]
                            },
                            {
                                model: models_1.default.User,
                                as: "updatedBy"
                            }
                        ]
                    })];
            case 20: 
            // @ts-ignore return updated leg and grades 
            return [2 /*return*/, _f.apply(_e, [_g.sent()])];
        }
    });
}); });
router.delete("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.default.Legislator.destroy({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).send(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
