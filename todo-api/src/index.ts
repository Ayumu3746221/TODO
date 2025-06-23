import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import apiRouter from '../routes/apiRouter.js';

const app = new Hono()

app.route('/api', apiRouter);

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
