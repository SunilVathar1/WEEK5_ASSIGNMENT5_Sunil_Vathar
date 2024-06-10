import { Request, Response } from 'express';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { getShiftsData } from '../middlewares/ShiftData';

export async function generatedReport(req: Request, res: Response) {
    try {
        // Fetch shifts data from middleware or database
        const shiftsData = await getShiftsData();

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
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
            worksheet.addRow({ ...shift });
        })

        // Generate Excel buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Define file path for saving the Excel file
        const filePath = path.resolve(__dirname, '../../shift-report.xlsx');

     
        const uint8Array = new Uint8Array(buffer);
        // Write buffer to a file
       let dataw=fs.writeFileSync(filePath, uint8Array, { encoding: 'binary' });

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=shift-report.xlsx');

        // Send response with the saved file path
        res.json({ message: 'Report generated successfully',data:shiftsData});
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Error generating report');
    }
}
