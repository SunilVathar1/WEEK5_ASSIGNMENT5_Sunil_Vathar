"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClaimsControll_1 = require("../controllers/ClaimsControll");
const jwt_1 = require("../middlewares/jwt");
const router = express_1.default.Router();
router.post("/registerClaims", jwt_1.jwtAuthMiddleWare, ClaimsControll_1.ClaimsInformation);
exports.default = router;
//# sourceMappingURL=ClaimsRoute.js.map