import { DataTypes, Model,UUID } from "sequelize";
import sequelize from "../postgres/pgConfig";
// import { UUID } from "crypto";
import Shift from "./Shift";
import TimeSheet from "./TimeSheet";
import Claims from "./Claims";
sequelize;

interface EmployeeAtributes {
  id: string;
  name: string;
  email: string;
  password: String;
  assignedShiftHours: number;
  role: string;
}

 class Employee extends Model<EmployeeAtributes>implements EmployeeAtributes{
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    assignedShiftHours!: number;
    role!: string;
}


Employee.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    assignedShiftHours:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,modelName:'Employee',timestamps:false})





export default Employee