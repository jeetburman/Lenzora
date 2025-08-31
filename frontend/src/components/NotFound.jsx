import { useState, useEffect } from 'react';

import './NotFound.css'

const NotFound = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add glitch effect at intervals
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);

    // Track mouse movement for parallax effect
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on cursor position
  const parallaxStyle = {
    transform: `translate(${cursorPosition.x * 0.01}px, ${cursorPosition.y * 0.01}px)`
  };

  return (
    <div className="not-found-container">
      <div className="background-elements">
        <div className="code-bracket" style={{...parallaxStyle, top: '20%', left: '10%'}}>{'{ }'}</div>
        <div className="code-bracket" style={{...parallaxStyle, top: '60%', right: '15%'}}>{'</>'}</div>
        <div className="binary-code" style={{...parallaxStyle, top: '30%', right: '20%'}}>101010</div>
        <div className="binary-code" style={{...parallaxStyle, bottom: '25%', left: '20%'}}>010101</div>
      </div>
      
      <div className={`not-found-content ${glitchEffect ? 'glitch' : ''}`}>
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit zero">0</span>
          <span className="digit">4</span>
        </div>
        
        <h1>Page Not Found</h1>
        <p>Looks like you've followed a broken link or entered a URL that doesn't exist on our site.</p>
        
        <div className="cta-buttons">
          <button 
            className="home-button"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
          <button 
            className="home-button primary"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      </div>
      
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-btn close"></span>
            <span className="terminal-btn minimize"></span>
            <span className="terminal-btn expand"></span>
          </div>
          <div className="terminal-title">bash — 80×30</div>
        </div>
        <div className="terminal-content">
          <p>$ find / -name "page_youre_looking_for"</p>
          <p>find: ‘/page_youre_looking_for’: No such file or directory</p>
          <p>$ <span className="cursor">_</span></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;