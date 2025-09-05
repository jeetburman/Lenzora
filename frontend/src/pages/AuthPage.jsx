import { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login' : 'Create Account'}
        </h2>
        
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-gray-400 text-center mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className="text-purple-400 hover:text-purple-300 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Make sure you have this default export
export default AuthPage;