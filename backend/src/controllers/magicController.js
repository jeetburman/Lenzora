// controllers/magicController.js
import Image from '../models/Image.js';
import User from '../models/User.js';
import { aiService } from '../services/aiService.js';
import { imageProcessing } from '../services/imageProcessing.js';

const applyAIMagic = async (c, action, processFunction) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();

    // Check if user has AI credits
    if (user.aiCredits <= 0 && user.subscription.plan === 'free') {
      return c.json({ error: 'Insufficient AI credits' }, 400);
    }

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Process the image with AI
    const result = await processFunction(image);

    // Update image record
    image.url = result.url;
    image.edits.push({
      action,
      parameters: {},
      timestamp: new Date()
    });

    await image.save();

    // Deduct AI credit for free users
    if (user.subscription.plan === 'free') {
      await User.findByIdAndUpdate(user._id, {
        $inc: { aiCredits: -1 }
      });
    }

    return c.json({
      message: `${action} applied successfully`,
      image,
      creditsRemaining: user.subscription.plan === 'free' ? user.aiCredits - 1 : 'unlimited'
    });
  } catch (error) {
    console.error(`Apply ${action} error:`, error);
    return c.json({ error: `Server error during ${action}` }, 500);
  }
};

const enhanceImage = async (c) => {
  return applyAIMagic(c, 'ai_enhance', aiService.enhanceImage);
};

const removeBackground = async (c) => {
  return applyAIMagic(c, 'background_remove', aiService.removeBackground);
};

const styleTransfer = async (c) => {
  const { style } = await c.req.json();
  return applyAIMagic(c, 'style_transfer', (image) => 
    aiService.styleTransfer(image, style)
  );
};

const colorizeImage = async (c) => {
  return applyAIMagic(c, 'colorize', aiService.colorize);
};

const upscaleImage = async (c) => {
  return applyAIMagic(c, 'upscale', aiService.upscale);
};

const removeObjects = async (c) => {
  const { objects } = await c.req.json();
  return applyAIMagic(c, 'object_remove', (image) => 
    aiService.removeObjects(image, objects)
  );
};

const getCredits = async (c) => {
  try {
    const user = c.get('user');
    
    return c.json({
      aiCredits: user.aiCredits,
      hasUnlimited: user.subscription.plan !== 'free'
    });
  } catch (error) {
    console.error('Get credits error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

export { 
  enhanceImage, 
  removeBackground, 
  styleTransfer, 
  colorizeImage, 
  upscaleImage, 
  removeObjects, 
  getCredits 
};