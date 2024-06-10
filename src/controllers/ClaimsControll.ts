import { decodeToken } from "../middlewares/jwt";
import { Request, Response } from "express";
import creaditionals from "../commons/creaditionals";
import Claims from "../models/Claims";
import { v4 } from "uuid";

export const ClaimsInformation = async (req: Request, res: Response) => {
  const headers: any = req.headers.authorization;
  const token = headers.split(" ")[1];
  try {
    let decodedData = decodeToken(token, creaditionals.secreat_key);
    console.log(decodedData);
    const myid = v4();
    let claims = await Claims.create({
      id: myid,
      key: req.body.key,
      value: req.body.value,
      employeeId: decodedData.employeeId,
    });

    res.json({
      msg: "claims registered sucessfully",
      data: claims,
    });
  } catch (error) {
    console.log("while creating the claims some thiing went wrong ");
    throw error;
  }
};
