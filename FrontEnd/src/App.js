import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";
import BecomeDonor from "./BecomeDonor";
import FindDonor from "./FindDonor";
import AdminPanel from "./AdminPanel";   // ✅ new import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/find-donor" element={<FindDonor />} />

        {/* ✅ Admin Route */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;