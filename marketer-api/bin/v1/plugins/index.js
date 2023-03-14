"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPlugin = exports.fairPlugin = exports.userPlugin = void 0;
const userPlugin_1 = __importDefault(require("./userPlugin"));
exports.userPlugin = userPlugin_1.default;
const fairPlugin_1 = __importDefault(require("./fairPlugin"));
exports.fairPlugin = fairPlugin_1.default;
const productPlugin_1 = __importDefault(require("./productPlugin"));
exports.productPlugin = productPlugin_1.default;
