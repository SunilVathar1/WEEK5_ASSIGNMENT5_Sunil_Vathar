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
exports.getShiftsData = void 0;
const Shift_1 = __importDefault(require("../models/Shift"));
const getShiftsData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield Shift_1.default.findAll();
        // Process data to calculate required fields
        return shifts.map(shift => {
            const { startTime, endTime, actualHours } = shift;
            return {
                date: startTime.toISOString().split('T')[0], // Get date part
                startTime: startTime.toTimeString().split(' ')[0].slice(0, 5), // Get time part HH:mm
                endTime: endTime.toTimeString().split(' ')[0].slice(0, 5), // Get time part HH:mm
                actualHours: actualHours,
            };
        });
    }
    catch (error) {
        console.error('Error fetching shift data:', error);
        throw error;
    }
});
exports.getShiftsData = getShiftsData;
//# sourceMappingURL=ShiftData.js.map