export default function HamburgerButton({ isOpen, onClick, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 ${className}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
            />
            <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""
                    }`}
            />
            <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
            />
        </button>
    );
}
