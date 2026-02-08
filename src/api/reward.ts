import { Hono } from "hono";
import { getInstanceDB } from "../helpers/Instancia.db";
import { rewardTable } from "../DB/schema";
import { desc } from "drizzle-orm";
import { parseLimit } from "../helpers/query.helper";
import z from "zod";
import { Reward, RewardSchema } from "../type/reward";

const app = new Hono();


app.get('/', async (c) => {
    try {
        const limit: number = parseLimit(c.req.query("limit"))

        const db = getInstanceDB(c);

        const reward: Reward[] = await db.select().from(rewardTable)
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


app.post("/", async (c) => {
    try {

        const body: unknown = await c.req.json();

        if (!Array.isArray(body) || body.length === 0) {
            return c.json({ msg: "Debe enviar al menos un reward" }, 400);
        }

        const data = await z.array(RewardSchema).safeParseAsync(body)

        if (!data.success || !data.data) {
            return c.json({ msg: "Error no conciden los type" }, 400)
        }

        const db = getInstanceDB(c);

        const result = await db.insert(rewardTable)
            .values(data.data)
            .returning({ id: rewardTable.id });

        return c.json(result, 201)
    } catch (error) {

        // Status code
        // Ref: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status#503_service_unavailable
        c.status(503)

        return c.json({ msg: "Error: El servidor se encuentra fuera de servicio o la base de datos esta detenida tempral mente" })
    }
})

export { app as reward_route }