import { poolConnection } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {


    let connection = poolConnection();

    try {

        let [response] = await connection.query("SELECT * FROM users WHERE active = 1")

        return new Response(JSON.stringify(response));
    } catch(err) {
        if(err instanceof Error) console.log(err);
        return new Response(JSON.stringify(err));
    }

}