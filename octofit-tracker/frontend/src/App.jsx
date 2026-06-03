import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function App() {
  return (
    <main>
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          React 19 presentation tier using Vite and <code>react-router-dom</code>.
        </p>
        <p>
          API base: <code>{apiBase}</code>
        </p>
        <p>
          {codespaceName
            ? `Codespace detected: ${codespaceName}`
            : 'VITE_CODESPACE_NAME is unset; using localhost fallback. Define VITE_CODESPACE_NAME in .env.local for Codespaces.'}
        </p>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

export default App;
