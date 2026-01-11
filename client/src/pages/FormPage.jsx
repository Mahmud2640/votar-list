import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { validateRecord } from "../utils/validators";
import Input from "../components/Input";

export default function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    serialNo: "",
    name: "",
    fatherName: "",
    voterNo: "",
    house: "",
    holdingNo: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const errs = validateRecord(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);
      await api.post("/records", form);
      toast.success("Voter record added successfully");
      navigate("/table");
    } catch (err) {
      toast.error("Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ➕ Add Voter Record
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Serial No"
            name="serialNo"
            type="number"
            value={form.serialNo}
            error={errors.serialNo}
            onChange={handleChange}
          />

          <Input
            label="Voter No"
            name="voterNo"
            value={form.voterNo}
            error={errors.voterNo}
            onChange={handleChange}
          />

          <Input
            label="Name"
            name="name"
            value={form.name}
            error={errors.name}
            onChange={handleChange}
          />

          <Input
            label="Father Name"
            name="fatherName"
            value={form.fatherName}
            error={errors.fatherName}
            onChange={handleChange}
          />

          <Input
            label="House"
            name="house"
            value={form.house}
            error={errors.house}
            onChange={handleChange}
          />

          <Input
            label="Holding No"
            name="holdingNo"
            value={form.holdingNo}
            error={errors.holdingNo}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading && (
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Saving..." : "Save Record"}
        </button>
        {/* added a button to go back to the table */}
        <button
          onClick={() => navigate("/table")}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          Go To List
        </button>
      </form>
    </div>
  );
}
