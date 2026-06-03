import { useEffect, useState } from 'react';
import { apiBase, normalizeResponse } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>API endpoint: <code>{`${apiBase}/api/users`}</code></p>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">Error loading users: {error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.id ?? Math.random()}>
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
