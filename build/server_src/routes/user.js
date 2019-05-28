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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var models_1 = require("../models");
var router = express_1.Router();
router.get("/me", function (req, res) {
    console.log(req);
    // @ts-ignore
    return res.json(req.user);
});
router.put("/me", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, _i, _a, _b, key, value, updatedUser, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(req.body);
                return [4 /*yield*/, models_1.sequelize.models.user.findOne({
                        where: {
                            // @ts-ignore
                            username: req.user.username
                        }
                    })];
            case 1:
                user = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, , 9]);
                _i = 0, _a = Object.entries(req.body);
                _c.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                _b = _a[_i], key = _b[0], value = _b[1];
                return [4 /*yield*/, user.set(key, value)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, user.save()];
            case 7:
                updatedUser = _c.sent();
                return [2 /*return*/, res.send(updatedUser)];
            case 8:
                err_1 = _c.sent();
                return [2 /*return*/, res.send(err_1)];
            case 9: return [2 /*return*/];
        }
    });
}); });
router.post("/new", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, email, authLevel, firstName, lastName, middleName, fullName, newUser, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                _a = req.body, username = _a.username, email = _a.email, authLevel = _a.authLevel, firstName = _a.firstName, lastName = _a.lastName, middleName = _a.middleName;
                if (!middleName) {
                    middleName = '';
                }
                fullName = "" + (firstName ? firstName + " " : '') + (middleName ? middleName.substring(0, 1) + " " : '') + lastName;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.sequelize.models.user.create({
                        username: username, fullName: fullName, email: email, authLevel: authLevel, firstName: firstName, lastName: lastName, middleName: middleName
                    })];
            case 2:
                newUser = _b.sent();
                return [2 /*return*/, res.send(newUser)];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.send(err_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/:username", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, models_1.sequelize.models.user.findOne({
                        where: {
                            username: req.params.username
                        },
                        include: [models_1.sequelize.models.update]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.put("/:username", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, models_1.sequelize.models.user.findOne({
                        where: {
                            username: req.params.username
                        },
                        include: [models_1.sequelize.models.update]
                    })];
            case 1: 
            // @ts-ignore
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
exports.default = router;
