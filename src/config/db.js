import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    uri: `mysql://34fmAhzLNnKJoPR.root:sg78oTOPBfklT9eb@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/full_stack_project?ssl={"rejectUnauthorized":true}`,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;