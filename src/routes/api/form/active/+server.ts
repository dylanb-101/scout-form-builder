import { poolConnection } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {

    let connection = poolConnection();

    let [response] = await connection.query("SELECT * FROM `forms` WHERE `active` = 1 LIMIT 1")
    
    return new Response(JSON.stringify(response));

}