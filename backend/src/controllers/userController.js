// controllers/userController.js
import User from '../models/User.js';

const updateProfile = async (c) => {
  try {
    const user = c.get('user');
    const { username, avatar } = await c.req.json();

    // Check if username is already taken by another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return c.json({ error: 'Username already taken' }, 400);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { username, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    return c.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const deleteAccount = async (c) => {
  try {
    const user = c.get('user');
    await User.findByIdAndDelete(user._id);
    
    // Note: In a real application, you would also need to delete
    // all user images from storage and database
    
    return c.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

const getStorageStats = async (c) => {
  try {
    const user = c.get('user');
    
    // In a real app, you would calculate this from the user's images
    return c.json({
      storageUsed: user.storageUsed,
      storageLimit: user.subscription.plan === 'free' ? 100 * 1024 * 1024 : // 100MB for free
                   user.subscription.plan === 'pro' ? 5 * 1024 * 1024 * 1024 : // 5GB for pro
                   50 * 1024 * 1024 * 1024, // 50GB for enterprise
      aiCredits: user.aiCredits
    });
  } catch (error) {
    console.error('Get storage stats error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

export { updateProfile, deleteAccount, getStorageStats };