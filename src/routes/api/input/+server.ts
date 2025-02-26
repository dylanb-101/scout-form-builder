import { poolConnection, } from "$lib/server/mysql";
import { error, type RequestHandler } from "@sveltejs/kit";
import type { IndexHtmlTransform } from "vite";

export const GET: RequestHandler = async ({ url }) => {

    let limit = url.searchParams.get("limit") || 100;
    // let uid = url.searchParams.get("uid");
    // let formId = url.searchParams.get("form_id");
    // let pageIndex = url.searchParams.get("page_index");
    // let groupId = url.searchParams.get("group_id");
    // let pageId = url.searchParams.get("page_id");
    // let sectionIndex = url.searchParams.get("section_index");

    let connection = poolConnection();

    let _rows: any;

    let cond = "";

    url.searchParams.forEach((val, key) => {
        if(key == "limit") return;

        cond += `\`${key}\` = ${isNaN(val as any) ? `"${val}"` : val} AND `
    })

    if(cond != "") cond = cond.substring(0, cond.length-4)

    let [result, fields] = await connection.query(`SELECT * FROM \`inputs\`${cond != "" ? ` WHERE ${cond}`:" "}LIMIT ${limit}`)
    return new Response(JSON.stringify(result));

}

export const POST: RequestHandler = async ({ request }) => {

    const params: 
    {inputType: string, formId: number, pageIndex: number, groupId?: number, pageId: number, sectionIndex: number, requried: boolean, questionText: string, helpText?: string, defaultValue: string, cssId?: string, textLimit?: number, pillBoxOptions?: string, pillboxValues?: string, pillBoxOrientation?: number, numMin?: number, numMax?: number, numIncrement?: boolean} = await request.json();

    let connection = poolConnection();

    let res: any;

    let [result, fields] = await connection.query(`
        INSERT INTO \`inputs\` (\`input_type\`, \`form_id\`, \`page_index\`, \`group_id\`, \`page_id\`, \`section_index\`, \`required\`, \`question_text\`, \`help_text\`, \`default_value\`, \`css_id\`, \`text_limit\`, \`pillbox_options\`, \`pillbox_values\`, \`pillbox_orientation\`, \`num_min\`, \`num_max\`, \`num_increment\`) VALUES ("${params.inputType}", ${params.formId}, ${params.pageIndex}, ${params.groupId || -1}, ${params.pageId}, ${params.sectionIndex}, ${params.requried || 0}, "${params.questionText}", "${params.helpText || ''}", "${params.defaultValue}", "${params.cssId || ""}", ${params.textLimit || 0}, "${params.pillBoxOptions || ""}", "${params.pillboxValues || ""}", ${params.pillBoxOrientation || 0}, ${params.numMin || 0}, ${params.numMax || 0}, ${params.numIncrement || 0})`);
    
    console.log(fields)

    return new Response(JSON.stringify(result));

}

export const PATCH: RequestHandler = async ({ request }) => {

    let connection = poolConnection();

    const params: { uid: number, inputType?: string, formId?: number, pageIndex?: number, groupId?: number, pageId?: number, sectionIndex?: number, required?: boolean, questionText?: string, helpText?: string, defaultValue?: string, cssId?: string, textLimit?: number, pillBoxOptions?: string, pillboxValues?: string, pillBoxOrientation?: number, numMin?: number, numMax?: number, numIncrement?: boolean } = await request.json();

    if(!params.uid) error(404, "No UID provided");

    let sql = "UPDATE `inputs` SET ";

    for(const param in params) {
        if(param == "formId") {
            sql += `\`form_id\` = ${params.formId}, `
        } else if(param == "pageId") {
            sql += `\`page_id\` = ${params.pageId}, `
        } else if(param == "inputType") {
            sql += `\`input_type\` = "${params.inputType}", `
        } else if(param == "pageIndex") {
            sql += `\`page_index\` = ${params.pageIndex}, `
        } else if(param == "groupId") {
            sql += `\`group_id\` = ${params.groupId}, `
        } else if(param == "sectionIndex") {
            sql += `\`section_index\` = ${params.sectionIndex}, `
        } else if(param == "required") {
            sql += `\`required\` = ${params.required}, `
        } else if(param == "questionIndex") {
            sql += `\`question_index\` = "${params.questionText}", `
        } else if(param == "helpText") {
            sql += `\`help_text\` = "${params.helpText}", `
        } else if(param == "defaultValue") {
            sql += `\`default_value\` = "${params.defaultValue}", `
        } else if(param == "cssId") {
            sql += `\`css_id\` = "${params.cssId}", `
        } else if(param == "textLimit") {
            sql += `\`text_limit\` = "${params.textLimit}", `
        } else if(param == "pillBoxOptions") {
            sql += `\`pillbox_options\` = "${params.pillBoxOptions}", `
        } else if(param == "pillboxValues") {
            sql += `\`pillbox_values\` = "${params.pillboxValues}", `
        } else if(param == "pillBoxOrientation") {
            sql += `\`pillbox_orientation\` = ${params.pillBoxOrientation}, `
        } else if(param == "numMin") {
            sql += `\`num_min\` = ${params.numMin}, `
        } else if(param == "numMax") {
            sql += `\`num_max\` = ${params.numMax}, `
        } else if(param == "numIncrement") {
            sql += `\`num_increment\` = ${params.numIncrement}, `
        }
    }

    sql = sql.substring(0, sql.length-2) + " "

    sql += `WHERE \`uid\` = ${params.uid} LIMIT 1`;

    const [result , fields] = await connection.query(sql);

    return new Response(JSON.stringify(result));
}