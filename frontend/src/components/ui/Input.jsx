export default function Input({
  label,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-400">{label}</label>
      )}
      <input
        type={type}
        className={`bg-[#11182B] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}
