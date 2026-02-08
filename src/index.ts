import { Hono } from 'hono'
import { reward_route } from './api/reward'

const app = new Hono()

app.route("/api/v1", reward_route)

export default app
