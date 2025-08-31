// controllers/imageController.js
import Image from '../models/Image.js';
import { cloudinary } from '../config/cloudinary.js';

const getAllImages = async (c) => {
  try {
    const user = c.get('user');
    const page = parseInt(c.req.query.page) || 1;
    const limit = parseInt(c.req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const images = await Image.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Image.countDocuments({ userId: user._id });

    return c.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get images error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const uploadImage = async (c) => {
  try {
    const user = c.get('user');
    
    if (!c.req.raw.file) {
      return c.json({ error: 'No file uploaded' }, 400);
    }

    const file = c.req.raw.file;
    
    // Create image record in database
    const image = new Image({
      originalName: file.originalname,
      fileName: file.filename,
      fileSize: file.size,
      mimeType: file.mimetype,
      userId: user._id,
      cloudinaryId: file.public_id,
      url: file.path,
      thumbUrl: file.path.replace('/upload/', '/upload/w_300,h_300,c_fill/'),
      metadata: {
        format: file.format
      }
    });

    await image.save();

    // Update user storage (simplified - in real app, you'd need to handle updates properly)
    await User.findByIdAndUpdate(user._id, {
      $inc: { storageUsed: file.size }
    });

    return c.json({
      message: 'Image uploaded successfully',
      image
    }, 201);
  } catch (error) {
    console.error('Upload image error:', error);
    return c.json({ error: 'Server error during upload' }, 500);
  }
};

const getImage = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    return c.json({ image });
  } catch (error) {
    console.error('Get image error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const updateImage = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();
    const { tags, isPublic } = await c.req.json();

    const image = await Image.findOneAndUpdate(
      { _id: id, userId: user._id },
      { tags, isPublic },
      { new: true, runValidators: true }
    );

    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    return c.json({
      message: 'Image updated successfully',
      image
    });
  } catch (error) {
    console.error('Update image error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const deleteImage = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Update user storage
    await User.findByIdAndUpdate(user._id, {
      $inc: { storageUsed: -image.fileSize }
    });

    // Delete from database
    await Image.findByIdAndDelete(id);

    return c.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const downloadImage = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // In a real app, you might want to generate a signed URL for download
    // or handle the download differently
    
    return c.json({ downloadUrl: image.url });
  } catch (error) {
    console.error('Download image error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

export { getAllImages, uploadImage, getImage, updateImage, deleteImage, downloadImage };