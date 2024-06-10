import { Request, Response } from "express";
import TimeSheet from "../models/TimeSheet";
import creaditionals from "../commons/creaditionals";
import Jwt from "jsonwebtoken";
import { v4 } from "uuid";

export const timeSheetRegister = async (req: Request, res: Response) => {
  const timeSheetDetails = req.body;
  //   console.log(timeSheetDetails);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const decoded:any = Jwt.verify(token, creaditionals.secreat_key);
    // const employeeId = decoded.employeedId;
    // const shiftId=decoded.shiftId

    // console.log(employeeId +"   "+employeeId);
    
    
    console.log("Decoded token:", decoded);
    // console.log(employeeId);

    const timeSheetInstance = await TimeSheet.create({
      shiftId:decoded.shiftId,
      employeeId:decoded.employeeId,
      ...timeSheetDetails,
    });

    res.json({
      msg: "TimeSheet Registered Successfully",
      data: timeSheetInstance,
    });
  } catch (error) {
    throw error;
  }
};
