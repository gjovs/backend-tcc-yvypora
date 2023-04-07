"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_key_json_1 = __importDefault(require("../configs/firebase-key.json"));
class FirebaseService {
    app;
    constructor(app = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebase_key_json_1.default),
        storageBucket: 'tcc-yvypora.appspot.com',
    })) {
        this.app = app;
    }
    async uploadImage(fileParameter) {
        const image = fileParameter;
        const bucket = firebase_admin_1.default.storage().bucket();
        const fileName = `${Date.now()}.${image.filename.split('.').pop()}`;
        const file = bucket.file(fileName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype,
            },
        });
        stream.on('error', (err) => console.log(err));
        stream.on('finish', async () => {
            await file.makePublic();
        });
        stream.end(image._buf);
        return `https://storage.googleapis.com/tcc-yvypora.appspot.com/${fileName}`;
    }
}
exports.FirebaseService = FirebaseService;
exports.default = new FirebaseService();
