import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page at "/" */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
