import { Hono } from 'hono';
import { authenticate } from '../middleware/auth.js';
import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/auth.controller.js';

const router = new Hono();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.patch('/profile', authenticate, updateProfile);

export default router;