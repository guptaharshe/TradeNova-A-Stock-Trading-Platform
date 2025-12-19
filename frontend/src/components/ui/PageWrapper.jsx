export default function PageWrapper({ title, titleColor, titleStyle, children }) {
  const titleClasses = titleColor
    ? `text-2xl font-bold mb-6 ${titleColor}`
    : "text-2xl font-bold text-white mb-6";

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      {title && (
        <h1 className={titleClasses} style={titleStyle}>
          {title}
        </h1>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
}
