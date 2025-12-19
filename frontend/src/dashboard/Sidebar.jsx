const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay - visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Empty Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-[#0D1321]/95 backdrop-blur-xl
          border-r border-white/10
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Sidebar Header with close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Empty Content Area */}
        <div className="flex-1 px-4 py-6 flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center">
            Sidebar content cleared
          </p>
        </div>

        {/* Sidebar Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            TradeNova © 2024
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
