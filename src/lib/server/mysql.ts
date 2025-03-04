import mysql from "mysql2/promise";
import CREDS from "$lib/server/db.json";

let connection: Promise<mysql.Connection> | null = null;

let pool: mysql.Pool | null = null;

/**
 * @deprecated
 *  pool connection instead
 */
export function mysqlConnection() {

    if(!connection) {

        connection = mysql.createConnection({
            database: CREDS.database,
            host: CREDS.host,
            user: CREDS.user,
            password: CREDS.password
        });

    }

    return connection;

}

export function poolConnection(): mysql.Pool {

    if(!pool) {
        pool = mysql.createPool({
            database: CREDS.database,
            host: CREDS.host,
            user: CREDS.user,
            password: CREDS.password,
            connectionLimit: 20
        });
    }

    return pool;

}