// services/imageProcessing.js
import { cloudinary } from '../config/cloudinary.js';

const crop = async (image, parameters) => {
  const { width, height, x, y } = parameters;
  const publicId = image.cloudinaryId;
  
  // Apply crop transformation
  const url = cloudinary.url(publicId, {
    transformation: [
      { width, height, x, y, crop: 'crop' }
    ]
  });

  return { url };
};

const rotate = async (image, parameters) => {
  const { angle } = parameters;
  const publicId = image.cloudinaryId;
  
  // Apply rotation transformation
  const url = cloudinary.url(publicId, {
    transformation: [
      { angle }
    ]
  });

  return { url };
};

const applyFilter = async (image, parameters) => {
  const { filter } = parameters;
  const publicId = image.cloudinaryId;
  
  let transformation = [];
  
  switch (filter) {
    case 'grayscale':
      transformation.push({ effect: 'grayscale' });
      break;
    case 'sepia':
      transformation.push({ effect: 'sepia' });
      break;
    case 'vintage':
      transformation.push({ effect: 'vintage' });
      break;
    case 'blur':
      transformation.push({ effect: 'blur:300' });
      break;
    default:
      throw new Error('Unknown filter');
  }
  
  const url = cloudinary.url(publicId, { transformation });
  return { url };
};

const adjust = async (image, parameters) => {
  const { brightness, contrast, saturation } = parameters;
  const publicId = image.cloudinaryId;
  
  const transformation = [];
  
  if (brightness) transformation.push({ effect: `brightness:${brightness}` });
  if (contrast) transformation.push({ effect: `contrast:${contrast}` });
  if (saturation) transformation.push({ effect: `saturation:${saturation}` });
  
  const url = cloudinary.url(publicId, { transformation });
  return { url };
};

export const imageProcessing = {
  crop,
  rotate,
  applyFilter,
  adjust
};