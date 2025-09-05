import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './pages/Editor';
import './App.css';

// Simple Home component
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center text-white p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md">
        <h1 className="text-4xl font-bold mb-6">Lenzora</h1>
        <p className="text-gray-300 mb-8">Photo Editor</p>
        <a 
          href="/editor" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Start Editing
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;