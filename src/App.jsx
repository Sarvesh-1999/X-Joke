import { useState } from "react";
import "./App.css"

function App() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke(null);

    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch joke. Please try again.");
      }
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">

<h1>Random Joke</h1>
      <p>Click the button to fetch a fresh one.</p>
      <button onClick={fetchJoke} disabled={ true}>
        {loading ? "Fetching…" : "Fetch joke"}
      </button>
      {error ? (
        <>
          <p>{error}</p>
          <button onClick={fetchJoke}>Try again</button>
        </>
      ) : joke ? (
        <>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </>
      ) : (
        <p>No joke yet.</p>
      )}


    </div>
  );
}

export default App;
