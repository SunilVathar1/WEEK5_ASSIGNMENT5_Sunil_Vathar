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
exports.generatedReport = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ShiftData_1 = require("../middlewares/ShiftData");
function generatedReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch shifts data from middleware or database
            const shiftsData = yield (0, ShiftData_1.getShiftsData)();
            // Create a new Excel workbook
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Shift Report');
            // Define worksheet columns
            worksheet.columns = [
                { header: 'Date', key: 'date', width: 15 },
                { header: 'Start Time', key: 'startTime', width: 15 },
                { header: 'End Time', key: 'endTime', width: 15 },
                { header: 'Actual Hours', key: 'actualHours', width: 15 },
            ];
            // Add rows to the worksheet
            shiftsData.forEach(shift => {
                // Calculate the difference between actual and assigned hours
                // Add the row to the worksheet
                worksheet.addRow(Object.assign({}, shift));
            });
            // Generate Excel buffer
            const buffer = yield workbook.xlsx.writeBuffer();
            // Define file path for saving the Excel file
            const filePath = path_1.default.resolve(__dirname, '../../shift-report.xlsx');
            const uint8Array = new Uint8Array(buffer);
            // Write buffer to a file
            let dataw = fs_1.default.writeFileSync(filePath, uint8Array, { encoding: 'binary' });
            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=shift-report.xlsx');
            // Send response with the saved file path
            res.json({ message: 'Report generated successfully', data: shiftsData });
        }
        catch (error) {
            console.error('Error generating report:', error);
            res.status(500).send('Error generating report');
        }
    });
}
exports.generatedReport = generatedReport;
//# sourceMappingURL=ReportsController.js.map