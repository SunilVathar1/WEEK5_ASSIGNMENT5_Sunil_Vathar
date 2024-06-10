import express  from "express";
import { loginEmployee, logoOutEmployee, registerEmployee } from "../controllers/EmployeeController";
import { jwtAuthMiddleWare } from "../middlewares/jwt";
// import { jwtAuthMiddleWare } from "../middlewares/jwt";

const router=express.Router();

router.post('/register',registerEmployee);  
router.post('/login',jwtAuthMiddleWare,loginEmployee)
router.post('/logout',logoOutEmployee)

export default router;

