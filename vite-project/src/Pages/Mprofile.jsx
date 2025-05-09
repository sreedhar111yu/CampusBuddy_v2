import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Mentees from '../Components/Sidebar_Mentees';

function Mprofile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    college: '',
    department: '',
    course: '',
    phoneNo: '',
    gender: '',
    graduationYear: { start: '', end: '' }, // Initialize with empty strings
    role: '',
    insight: '',
  });

  const [menteeId, setMenteeId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/mentees/me', { withCredentials: true })
      .then((res) => {
        // Ensure graduationYear is initialized with start and end values
        const data = res.data;
        setFormData({
          ...data,
          graduationYear: data.graduationYear || { start: '', end: '' }, // Default if missing
        });
        setMenteeId(data._id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'graduationStart' || name === 'graduationEnd') {
      setFormData((prev) => ({
        ...prev,
        graduationYear: {
          ...prev.graduationYear,
          [name === 'graduationStart' ? 'start' : 'end']: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!menteeId) return alert("Mentee ID not loaded.");

      const payload = {
        ...formData,
        graduationYear: {
          start: formData.graduationYear.start,
          end: formData.graduationYear.end,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/mentees/${menteeId}`,
        payload,
        { withCredentials: true }
      );
      console.log("✅ Profile updated:", response.data);
    } catch (error) {
      console.error("❌ Error updating profile:", error.message);
    }
  };

  return (
    <>
      <Sidebar_Mentees />
      <div className='md:ml-64'>
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Mentee Profile Update</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'First Name', name: 'firstName' },
              { label: 'Last Name', name: 'lastName' },
              { label: 'Email', name: 'email', disabled: true },
              { label: 'College', name: 'college' },
              { label: 'Department', name: 'department' },
              { label: 'Course', name: 'course' },
              { label: 'Phone Number', name: 'phoneNo' },
            ].map(({ label, name, disabled }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={disabled}
                  required={!disabled}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Grad Start Year</label>
                <input
                  type="number"
                  name="graduationStart"
                  value={formData.graduationYear.start}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grad End Year</label>
                <input
                  type="number"
                  name="graduationEnd"
                  value={formData.graduationYear.end}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="passedout">Passed Out</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Insight</label>
              <textarea
                name="insight"
                value={formData.insight}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience or goals"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Mprofile;
