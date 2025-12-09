import { useState } from "react";
import "./App.css";

const App = () => {
  const [joke, setJoke] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getJoke() {
    try {
      setLoading(true);
      let res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      let data = await res.json();
      setJoke(data);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      setLoading(false);
      setJoke({ message: "Could not fetch a joke. Try again" });
    }
  }

  return (
    <main>
      <section>
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one</p>
        <button onClick={getJoke}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {isError ? (
          <>
            <p style={{ color: "red" }}>{joke.message}</p>
            <span style={{ color: "blue", textDecoration: "underline" }}>
              Try again
            </span>
          </>
        ) : joke ? (
          <>
            <p>{joke.setup}</p>
            <strong>{joke.punchline}</strong>
          </>
        ) : (
          <>
            <p>No joke yet</p>
          </>
        )}
      </section>
    </main>
  );
};

export default App;
