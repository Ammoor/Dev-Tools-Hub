import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JsonFormatter from "./pages/JsonFormatter";
import Base64Tool from "./pages/Base64Tool";
import NotFound from "./pages/NotFound";
import ColorPicker from "./pages/ColorPicker";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64" element={<Base64Tool />} />
          <Route path="/colors" element={<ColorPicker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
