"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoOutEmployee = exports.loginEmployee = exports.registerEmployee = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Employee_1 = __importDefault(require("../models/Employee"));
const Shift_1 = __importDefault(require("../models/Shift"));
const jwt_1 = require("../middlewares/jwt");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const creaditionals_1 = __importDefault(require("../commons/creaditionals"));
const registerEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeDetails = req.body;
        let employeeexitance = yield Employee_1.default.findOne({
            where: {
                email: employeeDetails.email,
            },
        });
        if (!employeeexitance) {
            const hashedPassword = yield bcrypt_1.default.hash(employeeDetails.password, 10);
            employeeDetails.password = hashedPassword;
            // console.log(employeeDetails.password);
            const newEmployee = yield Employee_1.default.create(employeeDetails);
            // console.log(newEmployee);
            if (!newEmployee) {
                res.status(400).json({
                    msg: "Error in registering Employee",
                });
            }
            else {
                const payload = {
                    email: newEmployee.email,
                    password: newEmployee.password,
                };
                const token = yield (0, jwt_1.generateToken)(payload);
                // Employees.push(newEmployee);
                console.log(token);
                res.status(201).json({
                    msg: " Employee Registered Sucessfully",
                    data: newEmployee,
                    token: token,
                });
            }
        }
        else {
            res.status(400).json({
                msg: "Employee Already Exist",
            });
        }
    }
    catch (error) {
        console.log("Error-----------");
        throw error;
    }
});
exports.registerEmployee = registerEmployee;
function loginEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            let confirmUser = yield Employee_1.default.findOne({
                where: {
                    email: email,
                },
            });
            if (!confirmUser) {
                res.json({ msg: "Please Register!!" });
            }
            if (confirmUser) {
                const checkpassowrd = yield bcrypt_1.default.compare(password, confirmUser.password);
                console.log("result is : " + checkpassowrd);
                console.log(confirmUser.password);
                console.log(password);
                if (checkpassowrd) {
                    const date = new Date();
                    const shiftId = (0, uuid_1.v4)();
                    let ShiftRecord = yield Shift_1.default.create({
                        id: shiftId,
                        employeeID: confirmUser.id,
                        startTime: date,
                        actualHours: confirmUser.assignedShiftHours,
                        endTime: date,
                    });
                    const payload = {
                        employeedId: confirmUser.id,
                        email: email,
                        password: password
                    };
                    const token = yield (0, jwt_1.generateToken)(payload);
                    res.json({
                        msg: "Login Sucessfull",
                        data: confirmUser,
                        message: "shift created sucessfully",
                        record: ShiftRecord,
                        token: token
                    });
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.loginEmployee = loginEmployee;
const logoOutEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, creaditionals_1.default.secreat_key);
        const employeeId = decoded.employeedId;
        console.log('Decoded token:', decoded);
        console.log(employeeId);
        const shiftInstance = yield Shift_1.default.findOne({
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
        yield shiftInstance.save();
        // console.log('Shift instance updated:', shiftInstance);
        let token1 = jsonwebtoken_1.default.sign({ shiftId: shiftInstance.id, employeeId: shiftInstance.employeeID }, creaditionals_1.default.secreat_key);
        return res.status(200).json({ message: 'Successfully logged out and shift updated', shift: shiftInstance, tok: token1 });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            console.error('Invalid token:', error.message);
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Internal server error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.logoOutEmployee = logoOutEmployee;
//# sourceMappingURL=EmployeeController.js.map