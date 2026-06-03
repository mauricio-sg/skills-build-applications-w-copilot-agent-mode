import { useEffect, useState } from 'react';
import { apiBase, normalizeResponse } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/workouts`)
      .then((response) => response.json())
      .then((data) => setWorkouts(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p>API endpoint: <code>{`${apiBase}/api/workouts`}</code></p>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">Error loading workouts: {error}</p>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.id ?? Math.random()}>
            <strong>{workout.title}</strong> — {workout.difficulty}
            <p>{workout.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
