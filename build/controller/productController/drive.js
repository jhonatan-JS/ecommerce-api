"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;
const uploadFile = (fileMulter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: './googledrive.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const driveService = googleapis_1.google.drive({
            version: 'v3',
            auth,
        });
        const fileMetadata = {
            name: fileMulter.fieldname,
            parents: [GOOGLE_API_FOLDER_ID],
        };
        const media = {
            mimeType: fileMulter.mimetype,
            body: fs_1.default.createReadStream(fileMulter),
        };
        const response = yield driveService.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });
        return response;
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = uploadFile;
