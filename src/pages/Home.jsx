import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting("Welcome to SPA Development!");
  }, []);

  return (
    <main className="home-page">
      <h2>{greeting}</h2>

      <p>Button clicks: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Click Me ({count})
      </button>

      <section className="features">
        <h3>SPA Features Demonstrated:</h3>
        <ul>
          <li>Client-side routing (no page reload)</li>
          <li>State management with hooks</li>
          <li>Component reusability</li>
          <li>Hot Module Replacement (HMR)</li>
        </ul>
      </section>
    </main>
  );
}
