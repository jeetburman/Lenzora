import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';

const connector = require('./DB.js');

// Import routes
import authRoutes from './routes/auth.js';
import imageRoutes from './routes/images.js';

const app = new Hono();

// Global middleware
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use('*', async (c, next) => {
  connector()
});

// Request logging middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(`${c.req.method} ${c.req.path} - ${end - start}ms`);
});

// Routes
app.route('/auth', authRoutes);
app.route('/images', imageRoutes);

// Health check endpoint
app.get('/health', (c) => {
  const dbStatus = database.getConnectionStatus() ? 'connected' : 'disconnected';
  return c.json({ 
    status: 'OK', 
    service: 'Lenzora API',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;