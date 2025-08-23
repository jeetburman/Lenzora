import app from './index.js'
import { serve } from '@hono/node-server'

const port = 3001
serve({
  fetch: app.fetch,
  port,
})

console.log(`Backend running on http://localhost:${port}`)
