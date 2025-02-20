import mysql from "mysql2/promise";
import CREDS from "$lib/server/db.json";

let connection: Promise<mysql.Connection> | null = null;

export function mysqlConnection() {

    if(!connection) {

        connection = mysql.createConnection({
            database: CREDS.databse,
            host: CREDS.host,
            user: CREDS.user,
            password: CREDS.password
        });

    }

    return connection;

}