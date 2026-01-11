import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import EditModal from "../components/EditModal";

export default function TablePage() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await api.get(`/records?search=${search}`);
      setRecords(res.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const deleteRecord = async (id) => {
    if (!confirm("Delete this record?")) return;
    try {
      await api.delete(`/records/${id}`);
      toast.success("Deleted");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Voter Records</h1>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, voter no, etc..."
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Serial No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Voter No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Father Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  House
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Holding No
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {records.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-400 text-sm"
                  >
                    No records found
                  </td>
                </tr>
              )}

              {records.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-indigo-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.serialNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.voterNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.fatherName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{r.house}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.holdingNo}
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelected(r)}
                      className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRecord(r._id)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selected && (
        <EditModal
          record={selected}
          onClose={() => setSelected(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}
