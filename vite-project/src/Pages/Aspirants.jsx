import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Aspirants from '../Components/Sidebar_Aspirants';

function Aspirants() {
  const [viewstudent, setViewStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/me', { withCredentials: true });
        setViewStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error.message);
        setError('Failed to fetch student data.');
      }
    };
    fetchStudent();
  }, []);

  if (!viewstudent) {
    return (
      <div className='flex'>
        <Sidebar_Aspirants />
        <div className='md:ml-64 p-4'>
          <h2 className="text-2xl font-bold mb-2">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex'>
        <Sidebar_Aspirants />
      </div>
      <div className='md:ml-64 p-4'>
        <h2 className="text-2xl font-bold mb-2">Welcome 🎓, {viewstudent.firstName} {viewstudent.lastName} </h2>
        <p className="mt-4 text-lg">Email: {viewstudent.email}</p>
        <p className="text-lg">Phone: {viewstudent.phone}</p>
        <p className="text-lg">DOB: {new Date(viewstudent.dob).toLocaleDateString()}</p>
        <p className="text-lg">Graduation Year: {viewstudent.graduationYear}</p>
        <p className="text-lg">Gender: {viewstudent.gender}</p>
      </div>
    </>
  );
}

export default Aspirants;
