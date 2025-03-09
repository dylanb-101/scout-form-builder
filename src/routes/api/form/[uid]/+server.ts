import { error, json, type RequestHandler } from "@sveltejs/kit";
import { poolConnection } from "$lib/server/mysql";
import type { QueryResult } from "mysql2";
import { stringify } from "querystring";

class Form {
    uid: number = -1;
    name: string = "";
    active: boolean = false;   
}

export const GET: RequestHandler = async ({ params, url }) => {

    const id = params.uid;


    let connection = poolConnection();

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

//post request will have a stringified json object in the body, with content type application/json in header
export const POST: RequestHandler = async ({ request }) => {

    // console.log(await request.json());


    let data  = await request.json();

    let connection = poolConnection();
    
    let res: any;
    
    let req = await connection
    .query("SELECT * FROM `forms` WHERE `active` = 1 LIMIT 1")
    .then(([rows, fields]) => {
        
        // console.log(rows);
        
        return res = rows;
    
    })
    .catch((e) => {
        error(e);
    })

    console.log("res: ");
    console.log(res);
    console.log("data: ");
    console.log(data);

    //check if data.uid == activeForm.uid
    if(res[0].uid != data.uid) {
        return new Response(JSON.stringify({ error: "Form is not active" }));
    }

    let id: any = data.uid;
    //check if there does not exist a table titled form+uid (e.g. form1) then create it with the right header
    let [table] = await connection.query(`SHOW TABLES LIKE 'form${id}'`);
    let t: any = JSON.parse(JSON.stringify(table));
    if (t[0] == null || t[0] == undefined || Object.keys(t[0]).length == 0) {
        //make the header equal to the keys of data.submission
        let headers = Object.keys(data.submission);
        let query = `CREATE TABLE form${id} (id INT AUTO_INCREMENT PRIMARY KEY, ${headers.map(header => `\`${header}\`z VARCHAR(255)`).join(", ")})`;        console.log(query);
        let result: any;
        let fields: any;
        let req2 = await connection
        .query(query)
        .then(([rows, fields]) => {
            result = rows;
            fields = fields;

        }
        )
        .catch((e) => {

            console.log(e);
            error(501, e);
        })

    }
    
    console.log("table");
    console.log(table);
    // console.log(Object.values(t[0])[0]);



    //if a table called form+uid exists (e.g. form1), and the headers match, insert data into it
    //otherwise, error
    let tableName = "form" + data.uid;
    let headers = Object.keys(data.submission);
    let values = Object.values(data.submission);
    let query = `INSERT INTO ${tableName} (${headers.map(value => `\`${value}\``).join(",")}) VALUES (${values.map(value => `"${value}"`).join(",")})`;
    console.log(query);
    let result: any;
    let fields: any;
    let req2 = await connection
    .query(query)
    .then(([rows, fields]) => {
        console.log("um smth should be happening correctly")
        result = rows;
        fields = fields;
    }
    )
    .catch((e) => {
        console.log("bad")
        console.log(e)
        error(501, e);
    })
    console.log(result);
    console.log(fields);
    if(result.affectedRows == 0) {
        return new Response(JSON.stringify({ error: "Form not found" }));
    }
    
    return new Response(JSON.stringify({ uid: res[0].uid }));


}
