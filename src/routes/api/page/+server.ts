import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ url }) => {

    console.log(url.searchParams);


    error(303)

}