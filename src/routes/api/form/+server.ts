import { error, json, text, type RequestHandler } from "@sveltejs/kit";
import { poolConnection } from "$lib/server/mysql";

// let connection = await mysqlConnection()

export const GET: RequestHandler = async ({ url }) => {

    let limit = url.searchParams.get("limit") || 100;

    let connection = poolConnection();

    let _rows: any;

    let req = await connection
    .query(`SELECT * FROM forms LIMIT ${limit}`)
    .then(([rows, fields]) => {

        _rows = rows;

    })
    .catch((reason) => {
        error(400, reason);
    });
    
    return new Response(JSON.stringify(_rows));

}

export const POST: RequestHandler = async ({ request }) => {

    const { name, active, csvOrder }: {name: string, active: boolean, csvOrder: string} = await request.json();


    let connection = poolConnection();

    let res: any;

    let req = await connection
    .query(`INSERT INTO forms (name,active,csv_order) VALUES ("${name}",${active},"${csvOrder}")`)
    .then(([rows, fields]) => {

        console.log(rows);

        res = rows;

    })
    .catch((e) => {
        error(e);
    })
    
    

    return new Response(JSON.stringify({ uid: res.insertId }));

}

export const PUT: RequestHandler = async ({ request }) => {

    const { uid, name, active, csvOrder }: {uid: number, name: string, active: boolean, csvOrder: string} = await request.json();

    

    console.log(uid + ", " + name + ", " + active)

    if(!uid || !name || !active) {
        console.log("fail")
        error(400, "didnt provide all args");
    }


    let connection = poolConnection();


    let [result, fields] = await connection.query(`UPDATE \`forms\` SET \`name\`="${name}", \`active\`=${active}, \`csv_order\`="${csvOrder}" WHERE \`uid\`=${uid} LIMIT 1`);

    return new Response(JSON.stringify(result));

}