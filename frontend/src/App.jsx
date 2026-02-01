import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
