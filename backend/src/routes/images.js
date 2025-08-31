// routes/images.js
import { Hono } from 'hono';
import { 
  getAllImages, 
  uploadImage, 
  getImage, 
  updateImage, 
  deleteImage, 
  downloadImage 
} from '../controllers/imageController.js';
import auth from '../middleware/auth.js';
import handleUpload from '../middleware/upload.js';

const router = new Hono();

router.use('*', auth);
router.get('/', getAllImages);
router.post('/upload', handleUpload('image'), uploadImage);
router.get('/:id', getImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);
router.get('/:id/download', downloadImage);

export default router;