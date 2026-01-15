import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <ProtectedLayout>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </ProtectedLayout>
    </BrowserRouter>
  );
}
