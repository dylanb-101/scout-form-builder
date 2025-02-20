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

    let _rows: Form;

    let req = await connection
    .query(`SELECT * FROM forms WHERE uid = ${id} LIMIT 1`)
    .then(([rows, fields]) => {

        

        return new Response(JSON.stringify(rows));
    })
    .catch((reason) => {
        error(400, reason);
    });


}