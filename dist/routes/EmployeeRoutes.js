"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = require("../controllers/EmployeeController");
const jwt_1 = require("../middlewares/jwt");
// import { jwtAuthMiddleWare } from "../middlewares/jwt";
const router = express_1.default.Router();
router.post('/register', EmployeeController_1.registerEmployee);
router.post('/login', jwt_1.jwtAuthMiddleWare, EmployeeController_1.loginEmployee);
router.post('/logout', EmployeeController_1.logoOutEmployee);
exports.default = router;
//# sourceMappingURL=EmployeeRoutes.js.map