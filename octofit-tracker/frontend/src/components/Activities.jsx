import { useEffect, useState } from 'react';
import { apiBase, normalizeResponse } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/activities`)
      .then((response) => response.json())
      .then((data) => setActivities(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p>API endpoint: <code>{`${apiBase}/api/activities`}</code></p>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">Error loading activities: {error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id ?? Math.random()}>
            <strong>{activity.type}</strong> — {activity.durationMinutes ?? activity.durationMin ?? 'n/a'} minutes
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
