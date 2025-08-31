// app.js
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { config } from 'dotenv';
import connectDB from './src/config/database.js';


config();
connectDB(); 



// Import routes
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/users.js';
import imageRoutes from './src/routes/images.js';
import editRoutes from './src/routes/edits.js';
import magicRoutes from './src/routes/magic.js';

// Load environment variables
config();

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/users', userRoutes);
app.route('/api/images', imageRoutes);
app.route('/api/edits', editRoutes);
app.route('/api/magic', magicRoutes);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'OK', message: 'Lenzora API is running' });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// Start server
const port = process.env.PORT || 3001;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});