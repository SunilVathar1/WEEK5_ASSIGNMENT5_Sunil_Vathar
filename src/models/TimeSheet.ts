import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../postgres/pgConfig";
import { UUID } from "crypto";
import { isCallOrNewExpression } from "typescript";
import Employee from "./Employee";
import Shift from "./Shift";

interface TimeSheetAtributes {
  id:string,
  employeeId:string,
  shiftId:string,
  projectName:string,
  taskName:string;
  fromDate:Date;
  toDate:Date;
}

class TimeSheet extends Model<TimeSheetAtributes>implements TimeSheetAtributes{
    id!: string;
    employeeId!: string;
    shiftId!: string;
    projectName!: string;
    taskName!: string;
    fromDate!: Date;
    toDate!: Date;   
}

TimeSheet.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    employeeId: {
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Employee,
            key:'id'
        }
    },
    shiftId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Shift,
            key:'id'
        }
    },
    projectName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    taskName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fromDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    toDate:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{sequelize,modelName:'TimeSheet',timestamps:false})

// Association with timeSheet




export default TimeSheet