import { Hono } from 'hono'
import { reward_route } from './api/reward'
import { compress } from 'hono/compress'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// Global middleware
app.use(compress())
app.use(prettyJSON())

// Rutas
app.route("/api/v1/rewards", reward_route)

export default app
