import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first, then system preference
        const saved = localStorage.getItem("theme");
        if (saved) return saved;

        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light";
        }
        return "dark";
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        // Update body background based on theme
        if (theme === "light") {
            document.body.style.backgroundColor = "#F8FAFC";
        } else {
            document.body.style.backgroundColor = "#0A0F1F";
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const setDarkTheme = () => setTheme("dark");
    const setLightTheme = () => setTheme("light");

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setDarkTheme, setLightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
