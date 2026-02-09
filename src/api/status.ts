import { Hono } from "hono";
import { env } from "hono/adapter";
import { Env } from "../type/env";

const app = new Hono();


app.get("/", async (c) => {
    const { CORS } = env<Env>(c);

    return c.json({
        status: "OK",
        cors: CORS.split(",")
    })
})


export { app as status_route }