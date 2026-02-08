import { Hono } from "hono";
import { getInstanceDB } from "../helpers/Instancia.db";
import { rewardTable } from "../DB/schema";
import { desc } from "drizzle-orm";
import { parseLimit } from "../helpers/query.helper";
import z from "zod";
import { Reward, RewardSchema } from "../type/reward";
import { encode } from '@toon-format/toon'

const app = new Hono();

app.get('/', async (c) => {
    try {
        const limit: number = parseLimit(c.req.query("limit"))
        const db = getInstanceDB(c)

        const reward: Reward[] = await db
            .select()
            .from(rewardTable)
            .orderBy(desc(rewardTable.id))
            .limit(limit)

        // Decidir formato según Accept
        if (c.req.header("Accept")?.includes("application/toon")) {
            return c.text(encode(reward), 200)
        }

        return c.json(reward, 200)

    } catch (error) {
        // Mensaje de error único
        const errorMsg = { msg: "Error: El servidor se encuentra fuera de servicio o la base de datos está detenida temporalmente" }

        // Status code
        // Ref: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status#503_service_unavailable
        c.status(503)

        if (c.req.header("Accept")?.includes("application/toon")) {
            return c.text(encode(errorMsg), 503)
        }

        return c.json(errorMsg, 503)
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

        // Decidir formato según Accept
        if (c.req.header("Accept")?.includes("application/toon")) {
            return c.text(encode(result), 200)
        }

        return c.json(result, 201)

    } catch (error) {
        // Mensaje de error único
        const errorMsg = { msg: "Error: El servidor se encuentra fuera de servicio o la base de datos está detenida temporalmente" }

        // Status code
        // Ref: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status#503_service_unavailable
        c.status(503)

        if (c.req.header("Accept")?.includes("application/toon")) {
            return c.text(encode(errorMsg), 503)
        }

        return c.json(errorMsg, 503)
    }
})

export { app as reward_route }