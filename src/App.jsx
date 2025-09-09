import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page at "/" */}
        <Route path="/" element={<Home />} />

        {/* Result page with dynamic parameter */}
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
