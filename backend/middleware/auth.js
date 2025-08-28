import { verifyToken } from '../services/authService.js';
import User from '../models/User.js';

export const authenticate = async (c, next) => {
  try {
    // Get token from header
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Access denied. No token provided.' }, 401);
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return c.json({ error: 'Invalid token or user deactivated.' }, 401);
    }

    // Add user to context
    c.set('user', user);
    
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Invalid token.' }, 401);
  }
};

// Optional authentication (doesn't fail if no token provided)
export const optionalAuth = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        c.set('user', user);
      }
    }
    
    await next();
  } catch (error) {
    // Continue without authentication if token is invalid
    await next();
  }
};