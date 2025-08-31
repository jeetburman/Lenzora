// src/components/Home.jsx
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Lenzora</h1>
        <p className="text-xl text-purple-200">Your application homepage</p>
        <div className="mt-8">
          <a href="/auth" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg mr-4">
            Go to Auth
          </a>
          <a href="/nonexistent" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">
            Test 404
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;