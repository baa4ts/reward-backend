import { Hono } from 'hono'
import { reward_route } from './api/reward'
import { compress } from 'hono/compress'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

const app = new Hono()

// Middleware global
// app.use(compress())
app.use(prettyJSON())

// CORS
app.use(cors())

// Rutas
app.route("/api/v1/rewards", reward_route)

export default app
