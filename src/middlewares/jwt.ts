import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import creaditionals from '../commons/creaditionals';

//generating token using jwt
export const generateToken=(EmployeeData: string | object)=>{
    return  jwt.sign(EmployeeData,creaditionals.secreat_key)
}


export const jwtAuthMiddleWare=(req:Request,res:Response,next:NextFunction)=>{
    // extracting the token from the header
    let token=req.headers.authorization?.split(" ")[1]
    // console.log(token);
    
    if (!token) return res.json({msg: "token not found"});
    try {
        const decodedData=jwt.verify(token,creaditionals.secreat_key);
        // console.log(decodedData);
        req.body.Employee=decodedData;
        next()
        // return req.body.Employee
    } catch (error) {
        console.log(error);
        res.json({msg:'Invalid Token'})
    }
}

export function decodeToken(token: string, secret: string): any | null {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
