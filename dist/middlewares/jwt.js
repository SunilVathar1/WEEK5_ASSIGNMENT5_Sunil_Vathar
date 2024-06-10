"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.jwtAuthMiddleWare = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const creaditionals_1 = __importDefault(require("../commons/creaditionals"));
//generating token using jwt
const generateToken = (EmployeeData) => {
    return jsonwebtoken_1.default.sign(EmployeeData, creaditionals_1.default.secreat_key);
};
exports.generateToken = generateToken;
const jwtAuthMiddleWare = (req, res, next) => {
    var _a;
    // extracting the token from the header
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // console.log(token);
    if (!token)
        return res.json({ msg: "token not found" });
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, creaditionals_1.default.secreat_key);
        // console.log(decodedData);
        req.body.Employee = decodedData;
        next();
        // return req.body.Employee
    }
    catch (error) {
        console.log(error);
        res.json({ msg: 'Invalid Token' });
    }
};
exports.jwtAuthMiddleWare = jwtAuthMiddleWare;
function decodeToken(token, secret) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map