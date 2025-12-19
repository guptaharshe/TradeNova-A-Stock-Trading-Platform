export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="text-gray-400 text-sm">
          <tr className="border-b border-gray-700">
            {columns.map((col, i) => (
              <th key={i} className="py-4 px-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-white/5 transition-colors duration-200"
              >
                {Object.values(row).map((cell, j) => (
                  <td key={j} className="py-4 px-2 text-white">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
