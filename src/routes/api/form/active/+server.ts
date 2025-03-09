import { poolConnection } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {

    console.log("hi i got a req")

    let connection = poolConnection();

    // let ping = await connection.ping();
    // console.log(ping)

    // console.log(connection)

    try {

        let [response] = await connection.query("SELECT * FROM `forms` WHERE `active` = 1 LIMIT 1")

        console.log(response)
        return new Response(JSON.stringify(response));
    } catch(err) {
        if(err instanceof Error) console.log(err);
        return new Response(JSON.stringify(err));
    }

    

}