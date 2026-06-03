import { useEffect, useState } from 'react';
import { apiBase, normalizeResponse } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard`)
      .then((response) => response.json())
      .then((data) => setEntries(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API endpoint: <code>{`${apiBase}/api/leaderboard`}</code></p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">Error loading leaderboard: {error}</p>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id ?? Math.random()}>
            <strong>{entry.name}</strong> — {entry.points ?? entry.score ?? 0} points
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
