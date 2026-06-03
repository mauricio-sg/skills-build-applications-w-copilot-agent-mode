import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './index.css';

function Home() {
  return (
    <section>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>
        Select a section from the navigation to load data from the backend API.
      </p>
    </section>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'teams', element: <Teams /> },
      { path: 'activities', element: <Activities /> },
      { path: 'workouts', element: <Workouts /> },
      { path: 'leaderboard', element: <Leaderboard /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
