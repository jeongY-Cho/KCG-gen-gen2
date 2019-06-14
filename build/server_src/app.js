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
var path_1 = require("path");
var db = require(path_1.join(process.cwd(), "/models"));
var routes_1 = __importDefault(require("./routes"));
var path_2 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var admin = __importStar(require("firebase-admin"));
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "kcg-legislator-report-card",
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: "firebase-adminsdk-hnddn@kcg-legislator-report-card.iam.gserviceaccount.com"
    }),
    databaseURL: "https://kcg-legislator-report-card.firebaseio.com"
});
var app = express_1.default();
// serve static files
app.use(express_1.default.static(path_2.default.join(__dirname, "../client")));
//middleware to get body
app.use(express_session_1.default({
    secret: "whatwhy",
    saveUninitialized: false,
    resave: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// middleware for auth check on not GET requests
exports.authCheck = function (req, res, next) {
    console.log(req.method);
    console.log("session", req.session);
    console.log("headers", req.headers);
    if (req.method !== "GET") {
        if (req.session.isLoggedIn) {
            next();
        }
        else if (req.originalUrl === "/api/user/new") {
            next();
        }
        else {
            return res.sendStatus(401);
        }
    }
    else {
        next();
    }
};
// route for api
app.use("/api/user", exports.authCheck, routes_1.default.user);
app.use("/api/leg", exports.authCheck, routes_1.default.leg);
app.use("/generator", routes_1.default.generator);
app.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user_1, decodedToken, err_1, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(process.env.NODE_ENV === "DEVELOPMENT" && req.headers.bypass)) return [3 /*break*/, 2];
                return [4 /*yield*/, db.sequelize.models.User.findOne()];
            case 1:
                user_1 = _a.sent();
                req.session.isLoggedIn = true;
                req.session.user = user_1;
                return [2 /*return*/, res.status(200).send(user_1)];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, admin.auth().verifyIdToken(req.body.token)];
            case 3:
                decodedToken = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).send("Invalid Token")];
            case 5: return [4 /*yield*/, db.sequelize.models.User.findOne({
                    where: {
                        uid: decodedToken.uid
                    }
                })];
            case 6:
                user = _a.sent();
                if (user) {
                    req.session.user = user;
                    req.session.isLoggedIn = true;
                    return [2 /*return*/, res.status(200).send(user)];
                }
                else {
                    return [2 /*return*/, res.status(400).send("No such User")];
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/logout", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.session.destroy()];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).send("Logged out")];
        }
    });
}); });
app.get("*", function (req, res) {
    return res.sendFile(path_2.default.join(__dirname, "../client/index.html"));
});
exports.default = app;
