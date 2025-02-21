import { error, json, type RequestHandler } from "@sveltejs/kit";
import { mysqlConnection } from "$lib/server/mysql";
import type { QueryResult } from "mysql2";
import { stringify } from "querystring";

class Form {
    uid: number = -1;
    name: string = "";
    active: boolean = false;   
}

export const GET: RequestHandler = async ({ params, url }) => {

    const id = params.id;


    let connection = await mysqlConnection();

    let _rows: any;

    let req = await connection
    .query(`SELECT * FROM forms WHERE uid = ${id || -1} LIMIT 1`)
    .then(([rows, fields]) => {

        _rows = rows;

    })
    .catch((reason) => {
        error(401, reason) + "!";
    });

    return new Response(JSON.stringify(_rows));


}