import hjson from "npm:hjson"

export const config = hjson.parse(Deno.readFileSync("config.hjson").toString())