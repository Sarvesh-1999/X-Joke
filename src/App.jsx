import { useState } from "react";
import "./App.css";

const App = () => {
  const [joke, setJoke] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getJoke() {
    try {
      setLoading(true);
      setIsError(false);

      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await res.json();

      setJoke(data);
    } catch (error) {
      setIsError(true);
      setJoke({ message: "Could not fetch a joke. Try again" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section>
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one</p>

      
        <button onClick={getJoke} disabled={loading}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {isError ? (
          <>
            <p style={{ color: "red" }}>{joke?.message}</p>

            <span
              onClick={getJoke}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Try again
            </span>
          </>
        ) : joke ? (
          <>
            <p>{joke.setup}</p>
            <strong>{joke.punchline}</strong>
          </>
        ) : (
          <p>No joke yet</p>
        )}
      </section>
    </main>
  );
};

export default App;
