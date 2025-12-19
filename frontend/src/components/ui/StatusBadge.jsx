export default function StatusBadge({ status }) {
  const styles = {
    profit: "bg-green-600/20 text-green-400",
    loss: "bg-red-600/20 text-red-400",
    pending: "bg-yellow-600/20 text-yellow-400",
    completed: "bg-blue-600/20 text-blue-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-600/20 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
}
