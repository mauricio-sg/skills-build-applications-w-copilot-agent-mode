import { useEffect, useState } from 'react';
import { apiBase, normalizeResponse } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/teams`)
      .then((response) => response.json())
      .then((data) => setTeams(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p>API endpoint: <code>{`${apiBase}/api/teams`}</code></p>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">Error loading teams: {error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id ?? Math.random()}>
            <strong>{team.name}</strong> — {team.members ?? team.memberCount ?? 'n/a'} members
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
