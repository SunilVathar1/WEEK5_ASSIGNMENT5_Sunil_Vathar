import dotenv from "dotenv";
dotenv.config();
const creaditionals = {
    postgres: {
        DATABASE: process.env.DATABASE_NAME,
        USERNAME: process.env.USER_NAME,
        PASSWORD: process.env.PASSWORD,
        HOST: process.env.HOSTNAME,
        DBPORT: process.env.PORT,
        
    },
    secreat_key: process.env.SECREAT_KEY|| '',
};

console.log(creaditionals);

export default creaditionals