import { useState } from 'react';

const PhotoEditor = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState('Clarendon');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
  
  const filters = [
    { name: "Clarendon", icon: "fas fa-sun", color: "bg-yellow-400" },
    { name: "Juno", icon: "fas fa-moon", color: "bg-indigo-400" },
    { name: "Lark", icon: "fas fa-feather", color: "bg-pink-400" },
    { name: "Slumber", icon: "fas fa-bed", color: "bg-blue-400" },
    { name: "Crema", icon: "fas fa-mug-hot", color: "bg-amber-600" }
  ];
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDownload = () => {
    // In a real implementation, you would save the edited image
    alert('Download functionality would be implemented here!');
  };
  
  return (
    <div className="w-full max-w-6xl bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[90vh]">
      {/* Header */}
      <header className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <i className="fas fa-camera text-purple-500 text-2xl mr-3"></i>
          <h1 className="text-2xl font-bold text-white">Lenzora</h1>
        </div>
        <div className="flex space-x-3">
          <label className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg flex items-center hover:bg-gray-600 transition cursor-pointer">
            <i className="fas fa-upload mr-2"></i> Upload
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </label>
          <button 
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg flex items-center hover:bg-gray-600 transition"
            onClick={handleDownload}
          >
            <i className="fas fa-download mr-2"></i> Export
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg flex items-center hover:from-purple-700 hover:to-indigo-700 transition">
            <i className="fas fa-save mr-2"></i> Save Project
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-5">
            <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Editing Tools</h2>
            
            <h3 className="text-gray-300 font-medium mb-3">BASIC ADJUSTMENTS</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="crop-rotate" className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="crop-rotate" className="ml-2 text-gray-300">Crop & Rotate</label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="resize" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="resize" className="ml-2 text-gray-300">Resize</label>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="brightness" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="brightness" className="ml-2 text-gray-300">Brightness</label>
                </div>
                <div className="flex items-center space-x-3 pl-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={brightness} 
                    onChange={(e) => setBrightness(e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb" 
                  />
                  <span className="text-gray-400 w-12 text-sm">{brightness}%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="contrast" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="contrast" className="ml-2 text-gray-300">Contrast</label>
                </div>
                <div className="flex items-center space-x-3 pl-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={contrast} 
                    onChange={(e) => setContrast(e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb" 
                  />
                  <span className="text-gray-400 w-12 text-sm">{contrast}%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="saturation" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="saturation" className="ml-2 text-gray-300">Saturation</label>
                </div>
                <div className="flex items-center space-x-3 pl-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={saturation} 
                    onChange={(e) => setSaturation(e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb" 
                  />
                  <span className="text-gray-400 w-12 text-sm">{saturation}%</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-gray-300 font-medium mb-3">FILTERS & EFFECTS</h3>
            
            <div className="flex items-center mb-4">
              <input type="checkbox" id="filters" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
              <label htmlFor="filters" className="ml-2 text-gray-300">Preset Filters</label>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-8">
              {filters.map((filter, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-3 cursor-pointer flex flex-col items-center transition-all ${selectedFilter === filter.name ? 'border-2 border-purple-500 scale-105 bg-gray-700' : 'bg-gray-900'}`}
                  onClick={() => setSelectedFilter(filter.name)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${filter.color} text-white mb-2`}>
                    <i className={filter.icon}></i>
                  </div>
                  <span className="text-xs text-gray-300">{filter.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Home</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="history" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="history" className="ml-2 text-gray-300">History</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="tutorials" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="tutorials" className="ml-2 text-gray-300">Tutorials</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="pricing" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="pricing" className="ml-2 text-gray-300">Pricing</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Code</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="use" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="use" className="ml-2 text-gray-300">Use</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="help" defaultChecked className="h-4 w-4 text-purple-500 rounded" />
                  <label htmlFor="help" className="ml-2 text-gray-300">Help</label>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center transition-filter"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
                }}
            >
              <img 
                src={image} 
                alt="Preview" 
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>
          </div>
          
          <div className="p-5 bg-gray-800 border-t border-gray-700">
            <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">AI Superpowers</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-4">
                <h3 className="text-white font-medium flex items-center mb-2">
                  <i className="fas fa-magic mr-2"></i> AI Auto Enhance
                </h3>
                <p className="text-purple-200 text-sm mb-3">One-tap optimization using machine learning to perfect your image automatically.</p>
                <button className="px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-lg text-sm hover:bg-opacity-30 transition">
                  Apply Enhancement
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl p-4">
                <h3 className="text-white font-medium flex items-center mb-2">
                  <i className="fas fa-image mr-2"></i> Smart Background Swap
                </h3>
                <p className="text-cyan-200 text-sm mb-3">Replace your image background with AI-generated scenes with just one click.</p>
                <button className="px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-lg text-sm hover:bg-opacity-30 transition">
                  Change Background
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PhotoEditor;