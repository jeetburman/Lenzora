// routes/magic.js
import { Hono } from 'hono';
import { 
  enhanceImage, 
  removeBackground, 
  styleTransfer, 
  colorizeImage, 
  upscaleImage, 
  removeObjects, 
  getCredits 
} from '../controllers/magicController.js';
import auth from '../middleware/auth.js';

const router = new Hono();

router.use('*', auth);
router.post('/:id/enhance', enhanceImage);
router.post('/:id/background-remove', removeBackground);
router.post('/:id/style-transfer', styleTransfer);
router.post('/:id/colorize', colorizeImage);
router.post('/:id/upscale', upscaleImage);
router.post('/:id/object-remove', removeObjects);
router.get('/credits', getCredits);

export default router;