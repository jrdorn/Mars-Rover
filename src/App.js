import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoverDetail from "./pages/RoverDetail/RoverDetail";
import RoverListing from "./pages/RoverListing/RoverListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoverListing />} />
        <Route path="detail/:name" element={<RoverDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
