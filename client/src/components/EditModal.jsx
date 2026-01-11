import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { validateRecord } from "../utils/validators";
import Input from "../components/Input";

export default function EditModal({ record, onClose, onSuccess }) {
  const [form, setForm] = useState(record);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(record);
    setErrors({});
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submit = async () => {
    const errs = validateRecord(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);
      await api.put(`/records/${record._id}`, form);
      toast.success("Record updated successfully");
      onSuccess();
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            ✏️ Edit Voter Record
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
