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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var models_1 = __importStar(require("./models"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
//middleware to get body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// middleware to assign user 
app.use(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // @ts-ignore
                _a = req;
                return [4 /*yield*/, models_1.default.User.findOne({
                        where: {
                            username: "Mock_1"
                        }
                    })];
            case 1:
                // @ts-ignore
                _a.user = _b.sent();
                next();
                return [2 /*return*/];
        }
    });
}); });
// route for user endpoint 
app.use("/api/user", routes_1.default.user);
app.use("/api/leg", routes_1.default.leg);
app.get("/", function (req, res) {
    return res.sendFile("../client/index.html");
});
// initialize database connection
var force = true;
models_1.sequelize.sync({ force: force }).then(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!force) return [3 /*break*/, 2];
                return [4 /*yield*/, createMockData()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                app.listen(process.env.PORT, function () {
                    console.log("listening on port " + process.env.PORT);
                });
                return [2 /*return*/];
        }
    });
}); });
function createMockData() {
    return __awaiter(this, void 0, void 0, function () {
        var user1, user2, update, leg, grade1, grade2, grade3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.default.User.create({
                        username: "Mock_1",
                        fullName: "Johnny Appleseed",
                        firstName: "Johnny",
                        lastName: "Appleseed",
                        email: "123@123.com",
                        authenticationLevel: 0,
                    })
                    // @ts-ignore
                ];
                case 1:
                    user1 = _a.sent();
                    return [4 /*yield*/, models_1.default.User.create({
                            username: "Mock_2",
                            fullName: "Johnny Applesasdfeed",
                            firstName: "Johnnasdy",
                            lastName: "Applasdfeseed",
                            email: "123@1asdf23.com",
                            authenticationsLevel: 0,
                        })
                        // @ts-ignore
                    ];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, models_1.default.Update.create({
                            type: "rhetoric",
                            oldGrade: "B",
                            newGrade: "A"
                        })
                        // @ts-ignore
                    ];
                case 3:
                    update = _a.sent();
                    return [4 /*yield*/, models_1.default.Legislator.create({
                            fullName: "Joe Shmoe",
                            firstName: "Joe",
                            lastName: "Shmoe",
                            title: "SENATOR",
                            district: 4,
                            party: "REPUBLICAN",
                            grades: [
                                {
                                    type: "rhetoric",
                                    grade: "F"
                                },
                                {
                                    type: "donation",
                                    grade: "A"
                                },
                                {
                                    type: "voting",
                                    grade: "C"
                                }
                            ]
                        })
                        // @ts-ignore
                    ];
                case 4:
                    leg = _a.sent();
                    return [4 /*yield*/, models_1.default.Grade.create({
                            type: "rhetoric",
                            grade: "A"
                        })
                        // @ts-ignore
                    ];
                case 5:
                    grade1 = _a.sent();
                    return [4 /*yield*/, models_1.default.Grade.create({
                            type: "donation",
                            grade: "F"
                        })
                        // @ts-ignore
                    ];
                case 6:
                    grade2 = _a.sent();
                    return [4 /*yield*/, models_1.default.Grade.create({
                            type: "voting",
                            grade: "F"
                        })
                        // await update.set("legislatorId", user.get(""))
                    ];
                case 7:
                    grade3 = _a.sent();
                    // await update.set("legislatorId", user.get(""))
                    return [4 /*yield*/, grade1.set("legislatorId", leg.get('id'))];
                case 8:
                    // await update.set("legislatorId", user.get(""))
                    _a.sent();
                    return [4 /*yield*/, grade1.set("userId", user1.get('id'))];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, grade1.save()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, grade2.set("legislatorId", leg.get('id'))];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, grade2.set("userId", user2.get('id'))];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, grade2.save()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, grade3.set("legislatorId", leg.get('id'))];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, grade3.set("userId", user1.get('id'))];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, grade3.save()];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, update.set("userId", user1.get("id"))];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, update.set("legislatorId", leg.get("id"))];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, update.save()];
                case 19:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
