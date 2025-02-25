import { poolConnection, } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {

    let limit = url.searchParams.get("limit") || 100;
    let uid = url.searchParams.get("uid");
    let formId = url.searchParams.get("form_id");
    let pageId = url.searchParams.get("page_id");

    let connection = poolConnection();

    let _rows: any;

    if(uid) {
        let [result, fields] = await connection.query(`SELECT * FROM \`groups\` WHERE \`uid\` = ${uid} LIMIT ${limit}`)
        return new Response(JSON.stringify(result));
    } else if(formId && pageId) {
        let [result, fields] = await connection.query(`SELECT * FROM \`groups\` WHERE \`form_id\` = ${formId} AND \`page_id\` = ${pageId} LIMIT ${limit}`)
        return new Response(JSON.stringify(result))
    } else if(formId) {
        let [result, fields] = await connection.query(`SELECT * FROM \`groups\` WHERE \`form_id\` = ${formId} LIMIT ${limit}`)
        return new Response(JSON.stringify(result))
    } else if(pageId) {
        let [result, fields] = await connection.query(`SELECT * FROM \`groups\` WHERE \`page_id\` = ${pageId} LIMIT ${limit}`)
        return new Response(JSON.stringify(result))
    }

    let [result, fields] = await connection.query(`SELECT * FROM groups LIMIT ${limit}`)
    return new Response(JSON.stringify(result));

}

export const POST: RequestHandler = async ({ request }) => {

    const { formId, pageId, img, title, helpText }: 
    {formId: number, pageId: number, img: string, title: string, helpText: string} = await request.json();

    let connection = poolConnection();

    let res: any;

    let [result, fields] = await connection.query(`
        INSERT INTO \`groups\` 
        (\`form_id\`, \`page_id\`, \`img\`, \`title\`, \`help_text\`) VALUES (${formId}, ${pageId}, "${img}", "${title}", "${helpText}")`);
    
    console.log(fields)

    return new Response(JSON.stringify({uid: (result as any).insertId}));

}

export const PATCH: RequestHandler = async ({ request }) => {

    let connection = poolConnection();

    const params: {uid: number, formId?: number, pageId?: number, img?: string, title?: string, helpText?: string } = await request.json();

    if(!params.uid) error(404, "No UID provided");

    let sql = "UPDATE `groups` SET ";

    for(const param in params) {
        if(param == "formId") {
            sql += `\`form_id\` = ${params.formId}, `
        } else if(param == "pageId") {
            sql += `\`page_id\` = "${params.pageId}", `
        } else if(param == "img") {
            sql += `\`img\` = "${params.img}", `
        } else if(param == "title") {
            sql += `\`title\` = "${params.title}", `
        } else if(param == "helpText") {
            sql += `\`help_text\` = "${params.helpText}", `
        }
    }

    sql = sql.substring(0, sql.length-2) + " "

    sql += `WHERE \`uid\` = ${params.uid} LIMIT 1`;

    const [result , fields] = await connection.query(sql);

    return new Response(JSON.stringify(result));
}