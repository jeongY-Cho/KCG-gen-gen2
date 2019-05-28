"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./user"));
var legislator_1 = __importDefault(require("./legislator"));
exports.default = {
    user: user_1.default,
    leg: legislator_1.default
};
