// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (c, next) => {
  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return c.json({ error: 'Access denied. No token provided.' }, 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return c.json({ error: 'Invalid token.' }, 401);
    }

    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Invalid token.' }, 401);
  }
};

export default auth;