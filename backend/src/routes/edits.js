// routes/edits.js
import { Hono } from 'hono';
import { 
  cropImage, 
  rotateImage, 
  applyFilter, 
  adjustImage, 
  revertEdit, 
  getEditHistory 
} from '../controllers/editController.js';
import auth from '../middleware/auth.js';

const router = new Hono();

router.use('*', auth);
router.post('/:id/crop', cropImage);
router.post('/:id/rotate', rotateImage);
router.post('/:id/filter', applyFilter);
router.post('/:id/adjustments', adjustImage);
router.post('/:id/revert', revertEdit);
router.get('/:id/history', getEditHistory);

export default router;