// src/components/TailwindTest.jsx
// src/components/TestTailwind.jsx
const TestTailwind = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test</h1>
        <p className="text-xl text-purple-200 mb-6">
          If you can see this styled text, Tailwind is working!
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestTailwind;