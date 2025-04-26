import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Mentees from '../Components/Sidebar_Mentees'

function Mentees() {

  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mentees/me', {
          withCredentials: true, // to include session cookies if using express-session
        });
        setMentee(response.data);
      } catch (err) {
        setError('Error fetching mentee data');
      } finally {
        setLoading(false);
      }
    };

    fetchMentee();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
   
    <>
    <Sidebar_Mentees/>
    <div className='md:ml-64 px-4 py-10'>
    <div>
      <h1>Mentee Profile</h1>
      {mentee ? (
        <div>
          <p><strong>First Name:</strong> {mentee.firstName}</p>
          <p><strong>Last Name:</strong> {mentee.lastName}</p>
          <p><strong>Email:</strong> {mentee.email}</p>
          {/* Add other fields as necessary */}
        </div>
      ) : (
        <p>No mentee data found.</p>
      )}
    </div>
    </div>
    
    
    </>
  )
}

export default Mentees