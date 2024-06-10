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
exports.ClaimsInformation = void 0;
const jwt_1 = require("../middlewares/jwt");
const creaditionals_1 = __importDefault(require("../commons/creaditionals"));
const Claims_1 = __importDefault(require("../models/Claims"));
const uuid_1 = require("uuid");
const ClaimsInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    try {
        let decodedData = (0, jwt_1.decodeToken)(token, creaditionals_1.default.secreat_key);
        console.log(decodedData);
        const myid = (0, uuid_1.v4)();
        let claims = yield Claims_1.default.create({
            id: myid,
            key: req.body.key,
            value: req.body.value,
            employeeId: decodedData.employeeId,
        });
        res.json({
            msg: "claims registered sucessfully",
            data: claims,
        });
    }
    catch (error) {
        console.log("while creating the claims some thiing went wrong ");
        throw error;
    }
});
exports.ClaimsInformation = ClaimsInformation;
//# sourceMappingURL=ClaimsControll.js.map