"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReportsController_1 = require("../controllers/ReportsController");
const router = express_1.default.Router();
router.get("/generate", ReportsController_1.generatedReport);
exports.default = router;
//# sourceMappingURL=ReportingRoute.js.map