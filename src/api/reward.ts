import { Hono } from "hono";
import { getInstanceDB } from "../helpers/Instancia.db";
import { rewardTable } from "../DB/schema";
import { desc } from "drizzle-orm";
import { parseLimit } from "../helpers/query.helper";

const app = new Hono();


app.get('/reward', async (c) => {
    try {
        const limit: number = parseLimit(c.req.query("limit"))
        
        const db = getInstanceDB(c);

        const reward = await db.select().from(rewardTable)
            .orderBy(desc(rewardTable.id))
            .limit(limit)

        return c.json(reward, 200)

    } catch (error) {

        // Status code
        // Ref: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status#503_service_unavailable
        c.status(503)

        return c.json({ msg: "Error: El servidor se encuentra fuera de servicio o la base de datos esta detenida tempral mente" })
    }

})


export { app as reward_route }