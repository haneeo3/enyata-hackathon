import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatorSignIn from "./pages/CreatorSignIn";
import Dashboard2 from "./pages/Dashboard2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatorSignIn />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}