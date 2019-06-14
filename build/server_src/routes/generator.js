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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var path_1 = require("path");
var db = require(path_1.join(process.cwd(), "/models"));
var generator_1 = __importDefault(require("../generator"));
var router = express_1.Router();
// @ts-ignore
router.use(
// @ts-ignore
express_rate_limit_1.default({
    max: 100,
    headers: true,
    handler: function (req, res, next) {
        if (req.session.isLoggedIn) {
            next();
        }
        else {
            res.staus(429).send("Too many requests, please try again later.");
        }
    }
}));
// generate with query
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, session, title, district, id, _b, reportCard, fileName, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, session = _a.session, title = _a.title, district = _a.district, id = _a.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getReportCard(session, title, district, id)];
            case 2:
                _b = _c.sent(), reportCard = _b.reportCard, fileName = _b.fileName;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(400).send({
                        error: err_1,
                        reason: "No Legislator with specified queries found. Queries: " + JSON.stringify(req.query)
                    })];
            case 4:
                res.set("Content-disposition", "inline; filename=" + fileName);
                res.set("Content-Type", "image/jpeg");
                res.set("X-suggested-filename", fileName);
                return [2 /*return*/, res.send(reportCard)];
        }
    });
}); });
// generate with params in url
router.get("/:session/:title/:district", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, session, title, district, _b, reportCard, fileName, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, session = _a.session, title = _a.title, district = _a.district;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getReportCard(session, title, district)];
            case 2:
                _b = _c.sent(), reportCard = _b.reportCard, fileName = _b.fileName;
                return [3 /*break*/, 4];
            case 3:
                err_2 = _c.sent();
                return [2 /*return*/, res.status(400).send({
                        error: err_2,
                        reason: "No Legislator with specified queries found. Queries: " + JSON.stringify(req.params)
                    })];
            case 4:
                res.set("Content-disposition", "attachment; filename=" + fileName);
                res.set("X-suggested-filename", fileName);
                res.set("Content-Type", "image/jpeg");
                return [2 /*return*/, res.send(reportCard)];
        }
    });
}); });
function setFileName(name, session, title, district) {
    return (name
        .split(" ")
        .join("_")
        .split(".")
        .join("_") +
        "_" +
        session +
        title.substring(0, 3).toLowerCase() +
        district +
        ".jpeg");
}
router.get("/raw", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, district, Rhetoric, Voting, Donation, title, imgLink, session, grades, data, reportCard, fileName;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, name = _a.name, district = _a.district, Rhetoric = _a.Rhetoric, Voting = _a.Voting, Donation = _a.Donation, title = _a.title, imgLink = _a.imgLink, session = _a.session;
                if (!(name && district && Rhetoric && Voting && Donation && imgLink)) return [3 /*break*/, 2];
                grades = {
                    Rhetoric: Rhetoric,
                    Voting: Voting,
                    Donation: Donation
                };
                data = {
                    name: name,
                    imgLink: imgLink,
                    title: title,
                    grades: grades,
                    session: session,
                    district: district
                };
                return [4 /*yield*/, generator_1.default.makeReportCard(data)];
            case 1:
                reportCard = _b.sent();
                fileName = setFileName(name, session, title, district);
                res.set("Content-disposition", "attachment; filename=" + fileName);
                res.set("X-suggested-filename", fileName);
                res.set("Content-Type", "image/jpeg");
                return [2 /*return*/, res.send(reportCard)];
            case 2:
                res
                    .status(400)
                    .send("query must include name, district, Rhetoric, Voting, Donation, imgLink, title, and session");
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function getReportCard(session, title, district, id) {
    return __awaiter(this, void 0, void 0, function () {
        var leg, leg, data, _i, _a, grade, type, score, fileName, reportCard;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                            where: {
                                id: id
                            },
                            include: [db.sequelize.models.Grade]
                        })];
                case 1:
                    leg = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, db.sequelize.models.Legislator.findOne({
                        where: {
                            session: session,
                            title: title,
                            district: district
                        },
                        include: [db.sequelize.models.Grade]
                    })];
                case 3:
                    leg = _b.sent();
                    _b.label = 4;
                case 4:
                    data = {
                        imgLink: leg.get("imgLink"),
                        title: leg.get("title"),
                        name: leg.get("fullName"),
                        district: leg.get("district"),
                        session: leg.get("session"),
                        // @ts-ignore
                        grades: {}
                    };
                    for (_i = 0, _a = leg.get("Grades"); _i < _a.length; _i++) {
                        grade = _a[_i];
                        type = grade.get("type");
                        score = grade.get("grade");
                        data.grades[type] = score || "";
                    }
                    fileName = setFileName(data.name, data.session, data.title, data.district);
                    return [4 /*yield*/, generator_1.default.makeReportCard(data)];
                case 5:
                    reportCard = _b.sent();
                    console.log(reportCard);
                    return [4 /*yield*/, leg.set("lastGenerated", new Date())];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, leg.save()];
                case 7:
                    _b.sent();
                    return [2 /*return*/, { reportCard: reportCard, fileName: fileName }];
            }
        });
    });
}
exports.default = router;
