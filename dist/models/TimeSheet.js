"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("../postgres/pgConfig"));
const Employee_1 = __importDefault(require("./Employee"));
const Shift_1 = __importDefault(require("./Shift"));
class TimeSheet extends sequelize_1.Model {
}
TimeSheet.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Employee_1.default,
            key: 'id'
        }
    },
    shiftId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Shift_1.default,
            key: 'id'
        }
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fromDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    toDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, { sequelize: pgConfig_1.default, modelName: 'TimeSheet', timestamps: false });
// Association with timeSheet
exports.default = TimeSheet;
//# sourceMappingURL=TimeSheet.js.map