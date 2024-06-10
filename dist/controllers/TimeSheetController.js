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
exports.timeSheetRegister = void 0;
const TimeSheet_1 = __importDefault(require("../models/TimeSheet"));
const creaditionals_1 = __importDefault(require("../commons/creaditionals"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const timeSheetRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timeSheetDetails = req.body;
    //   console.log(timeSheetDetails);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, creaditionals_1.default.secreat_key);
        // const employeeId = decoded.employeedId;
        // const shiftId=decoded.shiftId
        // console.log(employeeId +"   "+employeeId);
        console.log("Decoded token:", decoded);
        // console.log(employeeId);
        const timeSheetInstance = yield TimeSheet_1.default.create(Object.assign({ shiftId: decoded.shiftId, employeeId: decoded.employeeId }, timeSheetDetails));
        res.json({
            msg: "TimeSheet Registered Successfully",
            data: timeSheetInstance,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.timeSheetRegister = timeSheetRegister;
//# sourceMappingURL=TimeSheetController.js.map