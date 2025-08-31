// middleware/upload.js
import { upload } from '../config/cloudinary.js';

const handleUpload = (fieldName) => {
  return (c, next) => {
    return new Promise((resolve, reject) => {
      upload.single(fieldName)(c.req.raw, c.req.raw.res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(next());
        }
      });
    });
  };
};

export default handleUpload;