import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home"; // You might need to create this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Set Auth as homepage */}
        <Route path="/home" element={<Home />} /> {/* Your main app page */}
        <Route path="/auth" element={<AuthPage />} /> {/* Auth page */}
        <Route path="/404" element={<NotFound />} /> {/* Direct 404 access */}
        <Route path="*" element={<NotFound />} /> {/* Catch all other routes */}
      </Routes>
    </Router>
  );
}

export default App;