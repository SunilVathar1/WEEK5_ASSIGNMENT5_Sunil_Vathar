"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const creaditionals_1 = __importDefault(require("../commons/creaditionals"));
const sequelize = new sequelize_1.Sequelize({
    database: 'postgres',
    // database:creaditionals.postgres.DATABASE,
    username: creaditionals_1.default.postgres.USERNAME,
    password: creaditionals_1.default.postgres.PASSWORD,
    host: creaditionals_1.default.postgres.HOST,
    port: Number(creaditionals_1.default.postgres.DBPORT),
    dialect: 'postgres'
});
sequelize.authenticate().then(() => {
    console.log("Database Connected Sucessfully");
}).catch((err) => {
    console.log("something wrong while connection to the Database", err);
});
sequelize.sync().then(() => {
    console.log("tables sync sucessfully");
}).catch((err) => {
    console.log("Did made tables sync", err);
});
exports.default = sequelize;
//# sourceMappingURL=pgConfig.js.map