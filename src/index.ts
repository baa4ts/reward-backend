import { Hono } from 'hono'
import { reward_route } from './api/reward'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { Env } from './type/env'
import { status_route } from './api/status'

const app = new Hono<{ Bindings: Env }>()
    .basePath("/api/v1/")

// Middleware global
app.use(prettyJSON())

// CORS
app.use("*", async (c, next) => {
    return cors({
        origin: c.env.CORS.split(",")
    })(c, next)
})

// Rutas
app.route("/rewards", reward_route)
app.route("/status", status_route)

export default app
