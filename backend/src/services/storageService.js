// services/storageService.js
import { cloudinary } from '../config/cloudinary.js';

const uploadImage = async (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'lenzora',
        public_id: originalName.split('.')[0] + '-' + Date.now(),
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    
    stream.end(buffer);
  });
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Delete image error:', error);
    throw error;
  }
};

export const storageService = {
  uploadImage,
  deleteImage
};