import { DataTypes,Model, UUIDV4} from "sequelize";
import sequelize from "../postgres/pgConfig";
import Employee from "./Employee";
import { UUID } from "crypto";


interface claimsAtributes{
    id:string,
    key:string,
    value:string,
    employeeId:string
}

class Claims extends Model<claimsAtributes>implements claimsAtributes{
    id!: string;
    key!: string;
    value!: string;
    employeeId!: string;
}

Claims.init({
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    key: {
        type:DataTypes.STRING,
        allowNull:false
    },
    value:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    employeeId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Employee,
            key:'id'
        }
    }
},{sequelize,modelName:'Claims',timestamps:false})



export default Claims