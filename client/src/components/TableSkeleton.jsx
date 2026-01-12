export default function TableSkeleton({
  rows = 10,
  columns = 7,
  showHeader = true,
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="skeleton-btn"></div>
            <div className="skeleton-title"></div>
          </div>
          <div className="skeleton-search"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full">
            {showHeader && (
              <thead className="bg-indigo-100">
                <tr>
                  {Array.from({ length: columns }).map((_, i) => (
                    <th key={i} className="px-6 py-4">
                      <div className="skeleton-th"></div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {Array.from({ length: rows }).map((_, r) => (
                <tr key={r} className="border-t">
                  {Array.from({ length: columns }).map((_, c) => (
                    <td key={c} className="px-6 py-4">
                      <div className="skeleton-td"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
