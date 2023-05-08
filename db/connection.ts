import mysql from "mysql";
import dotenv from "dotenv"
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

let db : mysql.Connection;

/**
 * @name connectDB
 * @description to connect the database
 * @returns mysql.Connection
 */
function connectDB(){
    db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD
      });
    
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      return db;
}

export {db, connectDB};