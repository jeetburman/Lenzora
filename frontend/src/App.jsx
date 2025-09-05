import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tailwind } from "./components/TailwindTest";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/404" element={<NotFound/>}></Route>
          <Route path="/" element={<Tailwind/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

