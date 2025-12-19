export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`
        bg-[#1A2238]
        rounded-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-black/30
        ${className}
      `}
    >
      {title && (
        <h2 className="text-white text-lg font-semibold mb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
