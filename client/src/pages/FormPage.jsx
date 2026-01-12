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
      // navigate("/table");
    } catch {
      toast.error("Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen form-bg flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="glass-card w-full max-w-3xl rounded-3xl shadow-2xl p-8 md:p-10"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Add Voter Record
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Fill in all required voter information carefully
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 input-animate">
          <Input
            label="Serial No"
            name="serialNo"
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

        {/* Actions */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Saving..." : "Save Record"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/table")}
            className="flex-1 rounded-xl border border-indigo-600 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
          >
            View List
          </button>
        </div>
      </form>
    </div>
  );
}
