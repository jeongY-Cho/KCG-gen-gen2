"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./user"));
var legislator_1 = __importDefault(require("./legislator"));
var express_1 = require("express");
var router = express_1.Router();
router.all("/user", user_1.default);
router.all("/leg", legislator_1.default);
exports.default = router;
