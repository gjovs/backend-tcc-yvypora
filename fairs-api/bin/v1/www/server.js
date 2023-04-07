"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("../Server"));
async function run() {
    await Server_1.default.listen({
        port: process.env.PORT ? Number(process.env.PORT) : 3335,
        host: '0.0.0.0',
    });
}
run().then(() => {
    console.log('HTTP SERVER RUNNING');
});
