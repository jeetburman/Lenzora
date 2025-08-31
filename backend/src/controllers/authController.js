// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const signup = async (c) => {
  try {
    const { username, email, password } = await c.req.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return c.json({ 
        error: 'User already exists with this email or username' 
      }, 400);
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return c.json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        storageUsed: user.storageUsed,
        aiCredits: user.aiCredits,
        subscription: user.subscription
      }
    }, 201);
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Server error during registration' }, 500);
  }
};

const login = async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate token
    const token = generateToken(user._id);

    return c.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        storageUsed: user.storageUsed,
        aiCredits: user.aiCredits,
        subscription: user.subscription
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Server error during login' }, 500);
  }
};

const getProfile = async (c) => {
  try {
    const user = c.get('user');
    return c.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        storageUsed: user.storageUsed,
        aiCredits: user.aiCredits,
        subscription: user.subscription,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};

export { signup, login, getProfile };