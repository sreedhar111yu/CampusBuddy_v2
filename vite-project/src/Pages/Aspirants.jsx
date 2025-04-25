import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Aspirants from '../Components/Sidebar_Aspirants';

function Aspirants() {
  const [profile, setProfile] = useState(null);

  // Fetch profile on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/students/me', { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(err => {
        console.error(err);
        window.location.href = '/'; // Redirect to login if not authenticated
      });
  }, []);

  // Logout handler using axios
  const handleLogout = () => {
    axios
      .get('http://localhost:5000/logout', { withCredentials: true })
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => console.error('Logout failed:', err));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <div className='flex'>
        <Sidebar_Aspirants />
      </div>
      <div className='md:ml-64 p-4'>
        <h1 className="text-2xl font-semibold mb-4">Aspirants Dashboard</h1>
        <h2 className="text-xl font-bold mb-2">Welcome, {profile.name}</h2>
        <p>Email: {profile.email}</p>
        <p>College: {profile.college || "N/A"}</p>
        <p>Interests: {profile.interests?.join(', ')}</p>
        <p>Insights: {profile.insights}</p>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Aspirants;
