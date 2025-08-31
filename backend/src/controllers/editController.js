// controllers/editController.js
import Image from '../models/Image.js';
import EditHistory from '../models/EditHistory.js';
import { imageProcessing } from '../services/imageProcessing.js';

const applyEdit = async (c, action, processFunction) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();
    const parameters = await c.req.json();

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Save previous state for history
    const previousState = {
      url: image.url,
      edits: [...image.edits]
    };

    // Process the image
    const result = await processFunction(image, parameters);

    // Update image record
    image.url = result.url;
    image.edits.push({
      action,
      parameters,
      timestamp: new Date()
    });

    await image.save();

    // Save to edit history
    const editHistory = new EditHistory({
      imageId: image._id,
      userId: user._id,
      action,
      parameters,
      previousState,
      newState: {
        url: image.url,
        edits: image.edits
      }
    });

    await editHistory.save();

    return c.json({
      message: `${action} applied successfully`,
      image
    });
  } catch (error) {
    console.error(`Apply ${action} error:`, error);
    return c.json({ error: `Server error during ${action}` }, 500);
  }
};

const cropImage = async (c) => {
  return applyEdit(c, 'crop', imageProcessing.crop);
};

const rotateImage = async (c) => {
  return applyEdit(c, 'rotate', imageProcessing.rotate);
};

const applyFilter = async (c) => {
  return applyEdit(c, 'filter', imageProcessing.applyFilter);
};

const adjustImage = async (c) => {
  return applyEdit(c, 'adjustments', imageProcessing.adjust);
};

const revertEdit = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();

    const image = await Image.findOne({ _id: id, userId: user._id });
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Get the last edit from history
    const lastEdit = await EditHistory.findOne({ 
      imageId: id, 
      userId: user._id 
    }).sort({ createdAt: -1 });

    if (!lastEdit) {
      return c.json({ error: 'No edit history found' }, 400);
    }

    // Revert to previous state
    image.url = lastEdit.previousState.url;
    image.edits = lastEdit.previousState.edits;

    await image.save();

    // Remove the last edit from history
    await EditHistory.findByIdAndDelete(lastEdit._id);

    return c.json({
      message: 'Edit reverted successfully',
      image
    });
  } catch (error) {
    console.error('Revert edit error:', error);
    return c.json({ error: 'Server error during revert' }, 500);
  }
};

const getEditHistory = async (c) => {
  try {
    const user = c.get('user');
    const { id } = c.req.param();
    const page = parseInt(c.req.query.page) || 1;
    const limit = parseInt(c.req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const history = await EditHistory.find({ 
      imageId: id, 
      userId: user._id 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await EditHistory.countDocuments({ 
      imageId: id, 
      userId: user._id 
    });

    return c.json({
      history,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get edit history error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

export { cropImage, rotateImage, applyFilter, adjustImage, revertEdit, getEditHistory };