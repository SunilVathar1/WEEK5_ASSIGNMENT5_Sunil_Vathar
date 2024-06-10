import { DataTypes,Model, UUIDV4} from "sequelize";
import sequelize from "../postgres/pgConfig";
import Employee from "./Employee";
// import { UUID } from "crypto";
import TimeSheet from "./TimeSheet";

interface ShiftAtributes{
    id:string,
    employeeID:string,
    startTime:Date,
    endTime:Date,
    actualHours:number
}

class Shift extends Model<ShiftAtributes>implements ShiftAtributes{
    [x: string]: any;
    id!: string;
    employeeID!: string;
    startTime!: Date;
    endTime!: Date;
    actualHours!: number;

}

Shift.init({
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
    },
    employeeID:{
        type:DataTypes.UUID,
        references:{
            model: Employee,
            key:'id'
        }
    },
    startTime:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endTime: {
        type:DataTypes.DATE,
        allowNull:true
    },
    actualHours: {
        type:DataTypes.FLOAT,
        allowNull:false
    }
},{sequelize,modelName:'Shift',timestamps:false})

//shift belong to Employee


export default Shift