import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import EditModal from "../components/EditModal";
import TableSkeleton from "../components/TableSkeleton";

export default function TablePage() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadData = async (isInitial = false) => {
    try {
      isInitial ? setLoading(true) : setFetching(true);
      const res = await api.get(`/records?search=${debouncedSearch}`);
      setRecords(res.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [debouncedSearch]);

  const deleteRecord = async (id) => {
    if (!confirm("Delete this record?")) return;
    try {
      await api.delete(`/records/${id}`);
      toast.success("Record deleted");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <TableSkeleton rows={10} columns={7} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 shadow-sm"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                Voter Records
              </h1>
              <p className="text-sm text-gray-500">
                Manage and update voter information
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or voter no"
              className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-indigo-300"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Table */}
        <div
          className={`relative overflow-x-auto rounded-2xl shadow-xl table-card ${
            fetching ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {fetching && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10" />
          )}

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky-head">
              <tr>
                {[
                  "Serial",
                  "Voter No",
                  "Name",
                  "Father",
                  "House",
                  "Holding",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {records.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No records found
                  </td>
                </tr>
              )}

              {records.map((r) => (
                <tr key={r._id} className="table-row-hover transition">
                  <td className="px-6 py-4 text-sm">{r.serialNo}</td>
                  <td className="px-6 py-4 text-sm">{r.voterNo}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {r.name}
                  </td>
                  <td className="px-6 py-4 text-sm">{r.fatherName}</td>
                  <td className="px-6 py-4 text-sm">{r.house}</td>
                  <td className="px-6 py-4 text-sm">{r.holdingNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setSelected(r)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteRecord(r._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700"
                      >
                        🗑
                      </button>
                    </div>
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
