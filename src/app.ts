import express,{Request,Response} from 'express'
import EmployeeRoutes from './routes/EmployeeRoutes'
import TimeSheetRoute from './routes/TImeSheetRoute';
import RegisterRoute from './routes/ReportingRoute'
import claimsRoute from './routes/ClaimsRoute'
const app=express();
const port=8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/Employee",EmployeeRoutes)
app.use("/api/TimeSheet", TimeSheetRoute)
app.use('/api/Claims',claimsRoute)
app.use('/api/Report',RegisterRoute)

app.listen(port,()=>{
    console.log("server Started Sucessfully https://localhost:",port);
})