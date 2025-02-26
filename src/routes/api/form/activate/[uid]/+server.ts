import { error, json, type RequestHandler } from "@sveltejs/kit";
import { poolConnection } from "$lib/server/mysql";
import type { QueryResult } from "mysql2";
import { stringify } from "querystring";

export const GET: RequestHandler = async ({ params, url }) => {

    const id = params.uid;


    let connection = poolConnection();

    let [deactivate] = await connection.query("UPDATE `forms` SET `active` = 0 WHERE `active` = 1");

    let [result, rows] = await connection.query(`UPDATE \`forms\` SET \`active\` = 1 WHERE \`uid\` = ${id} LIMIT = 1`);



    return new Response(JSON.stringify(result));


}