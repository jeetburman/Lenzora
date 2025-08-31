// routes/auth.js
import { Hono } from 'hono';
import { signup, login, getProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = new Hono();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', auth, getProfile);

export default router;