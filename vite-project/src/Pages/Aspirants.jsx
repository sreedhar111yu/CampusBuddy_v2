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

  
  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <div className='flex'>
        <Sidebar_Aspirants />
      </div>
      <div className='md:ml-64 p-4'>
      <h2 className="text-2xl font-bold mb-2">Welcome 🎓, {profile.firstName} {profile.lastName}</h2>
     
        
        
      </div>
    </>
  );
}

export default Aspirants;
