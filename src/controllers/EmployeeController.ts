import bycrypt from "bcrypt";
import Employee from "../models/Employee";
import { Request, Response } from "express";
import Shift from "../models/Shift";
import { generateToken } from "../middlewares/jwt";
import {v4} from 'uuid';
import  Jwt, {verify}  from "jsonwebtoken";
import creaditionals from "../commons/creaditionals";
import { Op } from "sequelize";



export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const employeeDetails = req.body;
    let employeeexitance = await Employee.findOne({
      where: {
        email: employeeDetails.email,
      },
    });
    if (!employeeexitance) {
      const hashedPassword = await bycrypt.hash(employeeDetails.password, 10);
      employeeDetails.password = hashedPassword;
      // console.log(employeeDetails.password);
      const newEmployee = await Employee.create(employeeDetails);
      // console.log(newEmployee);

      if (!newEmployee) {
        res.status(400).json({
          msg: "Error in registering Employee",
        });
      } else {
        const payload = {
          email: newEmployee.email,
          password: newEmployee.password,
        };
        const token = await generateToken(payload);
        // Employees.push(newEmployee);
        console.log(token);

        res.status(201).json({
          msg: " Employee Registered Sucessfully",
          data: newEmployee,
          token: token,
        });
      }
    } else {
      res.status(400).json({
        msg: "Employee Already Exist",
      });
    }
  } catch (error) {
    console.log("Error-----------");
    throw error;
  }
};

export async function loginEmployee(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    let confirmUser = await Employee.findOne({
      where: {
        email: email,
      },
    });
    if (!confirmUser) {
      res.json({ msg: "Please Register!!" });
    }
    if (confirmUser) {
      const checkpassowrd = await bycrypt.compare(password,confirmUser.password);
      console.log("result is : " + checkpassowrd);
      console.log(confirmUser.password)
      console.log(password);
           
      if (checkpassowrd) {
        const date = new Date();
        const shiftId=v4()
        let ShiftRecord =await Shift.create(
          {  
          id:shiftId,
          employeeID: confirmUser.id,
          startTime: date,
          actualHours: confirmUser.assignedShiftHours,
          endTime:date,
        }
      );

      const payload={
        employeedId:confirmUser.id ,
        email: email,
         password: password 
      }
        const token = await generateToken(payload);


        
        res.json({
          msg: "Login Sucessfull",
          data: confirmUser,
           message:"shift created sucessfully",
          record:ShiftRecord,
          token:token
        });
      }
    }
  } catch (error) {
    throw error
  }
}

export const logoOutEmployee = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  try {
    const decoded: any = Jwt.verify(token,creaditionals.secreat_key);
    const employeeId = decoded.employeedId;
    console.log('Decoded token:', decoded);
    console.log(employeeId);
    

    const shiftInstance = await Shift.findOne({
      where: {
        employeeID: employeeId,
      }
    });

    if (!shiftInstance) {
      console.error('Shift not found for employee ID:', employeeId);
      return res.status(404).json({ message: 'Shift not found' });
    }

    // console.log('Shift instance found:', shiftInstance);

    shiftInstance.endTime = new Date();
    shiftInstance.actualHours = (shiftInstance.endTime.getTime() - shiftInstance.startTime.getTime()) / (1000 * 60 * 60);

    await shiftInstance.save();

    // console.log('Shift instance updated:', shiftInstance);
    let token1=Jwt.sign({shiftId:shiftInstance.id,employeeId:shiftInstance.employeeID},creaditionals.secreat_key)
    return res.status(200).json({ message: 'Successfully logged out and shift updated', shift: shiftInstance, tok:token1});
  } catch (error) {
    if (error instanceof Jwt.JsonWebTokenError) {
      console.error('Invalid token:', error.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error'});
  }
};