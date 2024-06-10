"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const creaditionals = {
    postgres: {
        DATABASE: process.env.DATABASE_NAME,
        USERNAME: process.env.USER_NAME,
        PASSWORD: process.env.PASSWORD,
        HOST: process.env.HOSTNAME,
        DBPORT: process.env.PORT,
    },
    secreat_key: process.env.SECREAT_KEY || '',
};
console.log(creaditionals);
exports.default = creaditionals;
//# sourceMappingURL=creaditionals.js.map