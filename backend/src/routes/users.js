// routes/users.js
import { Hono } from 'hono';
import { updateProfile, deleteAccount, getStorageStats } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = new Hono();

router.use('*', auth);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);
router.get('/storage', getStorageStats);

export default router;