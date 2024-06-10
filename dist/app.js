"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeRoutes_1 = __importDefault(require("./routes/EmployeeRoutes"));
const TImeSheetRoute_1 = __importDefault(require("./routes/TImeSheetRoute"));
const ReportingRoute_1 = __importDefault(require("./routes/ReportingRoute"));
const ClaimsRoute_1 = __importDefault(require("./routes/ClaimsRoute"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/Employee", EmployeeRoutes_1.default);
app.use("/api/TimeSheet", TImeSheetRoute_1.default);
app.use('/api/Claims', ClaimsRoute_1.default);
app.use('/api/Report', ReportingRoute_1.default);
app.listen(port, () => {
    console.log("server Started Sucessfully https://localhost:", port);
});
//# sourceMappingURL=app.js.map