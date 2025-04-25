import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Aspirants from '../Components/Sidebar_Aspirants';

function Aprofile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    college: '',
    interests: [],
    insights: '',
  });

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/students/me', { withCredentials: true })
      .then(res => {
        setFormData(res.data);
        setStudentId(res.data._id); // 👈 Save student ID
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'interests') {
      setFormData({
        ...formData,
        interests: value.split(',').map((i) => i.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!studentId) return alert("Student ID not loaded.");

      const response = await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        formData,
        { withCredentials: true }
      );
      console.log("✅ Profile updated:", response.data);
    } catch (error) {
      console.error("❌ Error updating profile:", error.message);
    }
  };
  return (
 <>
 <Sidebar_Aspirants/>
 <div className='md:ml-64'>
 <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Information Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'role', 'phone', 'college'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interests (comma separated)
          </label>
          <input
            type="text"
            name="interests"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., AI, Web Dev, Networking"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Insights</label>
          <textarea
            name="insights"
            value={formData.insights}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your thoughts or experience"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>

 </div>
 </>
  )
}

export default Aprofile