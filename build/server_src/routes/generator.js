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
var models_1 = __importDefault(require("../models"));
var generator_1 = __importDefault(require("../generator"));
var router = express_1.Router();
// @ts-ignore
router.use(express_rate_limit_1.default({
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
// 
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data, fileName, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getReportCard.apply(void 0, req.query)];
            case 1:
                data = _c.sent();
                fileName = setFileName(data.name, data.session, data.title, data.district);
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                _b = (_a = res).send;
                return [4 /*yield*/, generator_1.default.makeReportCard(data)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var leg, data, _i, _a, grade, type, score, fileName, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, models_1.default.Legislator.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [models_1.default.Grade]
                })];
            case 1:
                leg = _d.sent();
                data = {
                    imgLink: leg.get("imgLink"),
                    title: leg.get("title"),
                    updatedAt: leg.get("updatedAt"),
                    name: leg.get("fullName"),
                    district: leg.get("district"),
                    // @ts-ignore
                    grades: {}
                };
                for (_i = 0, _a = leg.get("grades"); _i < _a.length; _i++) {
                    grade = _a[_i];
                    type = grade.get('type');
                    score = grade.get("grade");
                    data.grades[type] = score;
                }
                fileName = setFileName(data.name, leg.get("session"), data.title, data.district);
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                _c = (_b = res).send;
                return [4 /*yield*/, generator_1.default.makeReportCard(data)];
            case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
router.get("/:session/:title/:district", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, session, title, district, data, fileName, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.params, session = _a.session, title = _a.title, district = _a.district;
                return [4 /*yield*/, getReportCard(session, title, district)];
            case 1:
                data = _d.sent();
                fileName = setFileName(data.name, data.session, data.title, data.district);
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                _c = (_b = res).send;
                return [4 /*yield*/, generator_1.default.makeReportCard(data)];
            case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
function setFileName(name, session, title, district) {
    return name.split(" ").join("_").split(".").join("_") + "_" + session + title.substring(0, 3).toLowerCase() + district + ".jpeg";
}
function getReportCard(session, title, district) {
    return __awaiter(this, void 0, void 0, function () {
        var leg, data, _i, _a, grade, type, score;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.default.Legislator.findOne({
                        where: {
                            session: session, title: title, district: district
                        },
                        include: [models_1.default.Grade]
                    })];
                case 1:
                    leg = _b.sent();
                    console.log(leg.get("grades")[0].get("type"));
                    data = {
                        imgLink: leg.get("imgLink"),
                        title: leg.get("title"),
                        updatedAt: leg.get("updatedAt"),
                        name: leg.get("fullName"),
                        district: leg.get("district"),
                        session: leg.get("session"),
                        // @ts-ignore
                        grades: {}
                    };
                    for (_i = 0, _a = leg.get("grades"); _i < _a.length; _i++) {
                        grade = _a[_i];
                        type = grade.get('type');
                        score = grade.get("grade");
                        data.grades[type] = score;
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.default = router;
