import { poolConnection, } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {

    let limit = url.searchParams.get("limit") || 100;
    let uid = url.searchParams.get("uid");
    let formId = url.searchParams.get("form_id");
    console.log(uid, formId);

    let connection = poolConnection();

    let _rows: any;

    if(uid) {
        let [result, fields] = await connection.query(`SELECT * FROM pages WHERE \`uid\` = ${uid} LIMIT ${limit}`)
        return new Response(JSON.stringify(result));
    } else if(formId) {
        let [result, fields] = await connection.query(`SELECT * FROM pages WHERE \`form_id\` = ${formId} LIMIT ${limit}`)
        return new Response(JSON.stringify(result))
    }

    let [result, fields] = await connection.query(`SELECT * FROM pages LIMIT ${limit}`)
    return new Response(JSON.stringify(result));

}

export const POST: RequestHandler = async ({ request }) => {

    const { formId, name, footerText, footerHelpText, footerButtons, sectionNames, sectionHelpTexts }: 
    {formId: number, name: string, footerText: string, footerHelpText: string, footerButtons: string, sectionNames: string, sectionHelpTexts: string} = await request.json();

    let connection = poolConnection();

    let res: any;

    let [result, fields] = await connection.query(`
        INSERT INTO \`pages\` 
        (\`form_id\`, \`name\`, \`footer_text\`, \`footer_help_text\`, \`footer_buttons\`, \`section_names\`, \`section_help_texts\`) 
        VALUES (${formId}, "${name}", "${footerText}", "${footerHelpText}", "${footerButtons}", "${sectionNames}", "${sectionHelpTexts}")`);
    
    console.log(fields)

    return new Response(JSON.stringify(result));

}

export const PATCH: RequestHandler = async ({ request }) => {

    let connection = poolConnection();

    const params: {uid: number, formId?: number, name?: string, footerText?: string, footerHelpText?:string, footerButtons?: string, sectionNames?: string, sectionHelpTexts?: string } = await request.json();

    if(!params.uid) error(404, "No UID provided");

    let sql = "UPDATE `pages` SET ";

    for(const param in params) {
        if(param == "formId") {
            sql += `\`form_id\` = ${params.formId}, `
        } else if(param == "name") {
            sql += `\`name\` = "${params.name}", `
        } else if(param == "footerText") {
            sql += `\`footer_text\` = "${params.footerText}", `
        } else if(param == "footerHelpText") {
            sql += `\`footer_help_text\` = "${params.footerHelpText}", `
        } else if(param == "footerButtons") {
            sql += `\`footer_buttons\` = "${params.footerButtons}", `
        } else if(param == "sectionNames") {
            sql += `\`section_names\` = "${params.sectionNames}", `
        } else if(param == "sectionHelpTexts") {
            sql += `\`section_help_texts\` = "${params.sectionHelpTexts}", `
        }
    }

    sql = sql.substring(0, sql.length-2) + " "

    sql += `WHERE \`uid\` = ${params.uid} LIMIT 1`;

    const [result , fields] = await connection.query(sql);

    return new Response(JSON.stringify(result));
}