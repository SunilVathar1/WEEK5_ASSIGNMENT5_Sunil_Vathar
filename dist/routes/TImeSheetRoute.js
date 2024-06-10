"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TimeSheetController_1 = require("../controllers/TimeSheetController");
const router = express_1.default.Router();
router.post('/register', TimeSheetController_1.timeSheetRegister);
exports.default = router;
//# sourceMappingURL=TImeSheetRoute.js.map