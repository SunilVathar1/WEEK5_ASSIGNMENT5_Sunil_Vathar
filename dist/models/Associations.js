"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Claims_1 = __importDefault(require("./Claims"));
const Employee_1 = __importDefault(require("./Employee"));
const Shift_1 = __importDefault(require("./Shift"));
const TimeSheet_1 = __importDefault(require("./TimeSheet"));
Employee_1.default.hasMany(Shift_1.default, { foreignKey: 'employeeId' });
Shift_1.default.belongsTo(Employee_1.default, { foreignKey: 'employeeId' });
Employee_1.default.hasMany(TimeSheet_1.default, { foreignKey: 'employeeId' });
TimeSheet_1.default.belongsTo(Employee_1.default, { foreignKey: 'employeeId' });
Shift_1.default.hasMany(TimeSheet_1.default, { foreignKey: 'shiftId' });
TimeSheet_1.default.belongsTo(Shift_1.default, { foreignKey: 'shiftId' });
Employee_1.default.hasMany(Claims_1.default, { foreignKey: 'employeeId' });
Claims_1.default.belongsTo(Employee_1.default, { foreignKey: 'employeeId' });
//# sourceMappingURL=Associations.js.map