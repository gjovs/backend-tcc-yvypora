"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Marketer_1 = __importDefault(require("../model/Marketer"));
async function default_1(server) {
    server.get('/details', { onRequest: [server.auth] }, (req, rep) => rep.send(req.user));
    server.get('/fairs', {
        onRequest: [server.auth],
    }, async (req, rep) => {
        const res = await Marketer_1.default.indexFairs(req.user.id);
        if (!res) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: 'Fairs not found with this marketer',
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: res,
        });
    });
}
exports.default = default_1;
