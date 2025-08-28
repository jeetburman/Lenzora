import * as authService from '../services/authService.js';

export const register = async (c) => {
  try {
    const body = await c.req.json();
    const { username, email, password } = body;

    // Validation
    if (!username || !email || !password) {
      return c.json({ error: 'Please provide all required fields' }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }

    // Register user
    const { user, token } = await authService.registerUser({
      username,
      email,
      password
    });

    return c.json({
      message: 'User registered successfully',
      user,
      token
    }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ error: error.message }, 400);
  }
};

export const login = async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return c.json({ error: 'Please provide email and password' }, 400);
    }

    // Login user
    const { user, token } = await authService.loginUser(email, password);

    return c.json({
      message: 'Login successful',
      user,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: error.message }, 401);
  }
};

export const getProfile = async (c) => {
  try {
    const user = c.get('user');
    
    return c.json({
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
};

export const updateProfile = async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { username, avatar } = body;

    // Update user
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
    return c.json({ error: 'Failed to update profile' }, 500);
  }
};