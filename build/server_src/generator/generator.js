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
Object.defineProperty(exports, "__esModule", { value: true });
var jimp_1 = __importDefault(require("jimp"));
var Generator = /** @class */ (function () {
    function Generator(config) {
        var _this = this;
        this.config = config;
        // @ts-ignore
        this.fonts = {};
        jimp_1.default.loadFont(config.fonts.large).then(function (font) {
            _this.fonts.large = font;
        });
        jimp_1.default.loadFont(config.fonts.medium).then(function (font) {
            _this.fonts.medium = font;
        });
        jimp_1.default.loadFont(config.fonts.small).then(function (font) {
            _this.fonts.small = font;
        });
        jimp_1.default.loadFont(config.fonts.xsmall).then(function (font) {
            _this.fonts.xsmall = font;
        });
    }
    Generator.prototype.makeReportCard = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var portrait, template, scaledPortrait, reportCard, cardWithText, bufferedCard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        return [4 /*yield*/, jimp_1.default.read(data.imgLink)];
                    case 1:
                        portrait = _a.sent();
                        return [4 /*yield*/, jimp_1.default.read(this.config.template)];
                    case 2:
                        template = _a.sent();
                        scaledPortrait = portrait.cover(this.config.loc.portraitScale[0], this.config.loc.portraitScale[1]);
                        reportCard = template.composite(scaledPortrait, this.config.loc.portrait[0], this.config.loc.portrait[1], 
                        //@ts-ignore
                        { mode: jimp_1.default.BLEND_DESTINATION_OVER });
                        cardWithText = this.printText(reportCard, data);
                        return [4 /*yield*/, cardWithText.getBufferAsync(jimp_1.default.MIME_JPEG)];
                    case 3:
                        bufferedCard = _a.sent();
                        return [2 /*return*/, bufferedCard];
                }
            });
        });
    };
    Generator.prototype.printText = function (templateObj, data) {
        var date = new Date(Date.now());
        var strfdate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long"
        });
        var updatedStr = "Updated: " + strfdate;
        var d = jimp_1.default.measureText(this.fonts.xsmall, updatedStr);
        var districtStr;
        switch (data.title) {
            case "REPRESENTATIVE": {
                districtStr = "House District " + data.district;
                break;
            }
            case "SENATOR": {
                districtStr = "Senate District " + data.district;
                break;
            }
        }
        return (templateObj
            .print(this.fonts.medium, this.config.loc.name[0], this.config.loc.name[1], data.name, this.config.nameMaxWidth)
            .print(this.fonts.xsmall, this.config.loc.updated[0] - d, this.config.loc.updated[1], updatedStr)
            // @ts-ignore
            .print(this.fonts.medium, this.config.loc.district[0], this.config.loc.district[1], districtStr)
            .print(this.fonts.large, this.config.loc.voting[0], this.config.loc.voting[1], data.grades.Voting)
            .print(this.fonts.large, this.config.loc.rhetoric[0], this.config.loc.rhetoric[1], data.grades.Rhetoric)
            .print(this.fonts.large, this.config.loc.donation[0], this.config.loc.donation[1], data.grades.Donation));
    };
    return Generator;
}());
exports.default = Generator;
