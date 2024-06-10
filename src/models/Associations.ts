import Claims from "./Claims";
import Employee from "./Employee";
import Shift from "./Shift";
import TimeSheet from "./TimeSheet";


Employee.hasMany(Shift, { foreignKey: 'employeeId' });
Shift.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(TimeSheet, { foreignKey: 'employeeId' });
TimeSheet.belongsTo(Employee, { foreignKey: 'employeeId' });

Shift.hasMany(TimeSheet, { foreignKey: 'shiftId' });
TimeSheet.belongsTo(Shift, { foreignKey: 'shiftId' });

Employee.hasMany(Claims, { foreignKey: 'employeeId' });
Claims.belongsTo(Employee, { foreignKey: 'employeeId' });