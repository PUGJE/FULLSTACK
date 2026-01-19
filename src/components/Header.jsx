import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Apply theme to whole page (body)
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className={`header ${theme}`}>
      <div className="container">
        <h1>My First SPA</h1>
        <p>Created with React & Vite</p>

        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </header>
  );
}
