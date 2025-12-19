export default function EmptyState({
  title = "No data found",
  description = "There is nothing to show here yet.",
}) {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}
