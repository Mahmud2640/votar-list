import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}
