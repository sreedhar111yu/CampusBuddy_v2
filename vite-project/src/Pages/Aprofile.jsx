import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Aspirants from '../Components/Sidebar_Aspirants';

function Aprofile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    nationality: '',
    phone: '',
    email: '',
    graduationYear: '',
  });

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/students/me', { withCredentials: true })
      .then(res => {
        const { name, graduationYear, dob, gender, nationality, phone, email } = res.data;
        const [firstName, ...lastNameParts] = name?.split(' ') || [];
        setFormData({
          firstName: firstName || '',
          lastName: lastNameParts?.join(' ') || '',
          dob: dob || '',
          gender: gender || '',
          nationality: nationality || '',
          phone: phone || '',
          email: email || '',
          graduationYear: graduationYear || '',
        });
        setStudentId(res.data._id);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!studentId) return alert("Student ID not loaded.");
      const updatedName = `${formData.firstName} ${formData.lastName}`;
      await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        {
          name: updatedName,
          dob: formData.dob,
          gender: formData.gender,
          nationality: formData.nationality,
          phone: formData.phone,
          email: formData.email,
          graduationYear: formData.graduationYear,
        },
        { withCredentials: true }
      );
      alert("✅ Profile updated!");
    } catch (error) {
      console.error("❌ Error updating profile:", error.message);
    }
  };

  // profile get
  

  return (
    <>
      <Sidebar_Aspirants />
      <div className="md:ml-64 px-4 py-10">
      {/* <h2 className="text-2xl font-bold mb-2">Name: {profile.firstName} {profile.lastName}</h2> */}
      
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-black text-white rounded-full">Profile</button>
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Graduation Year</label>
              <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-full font-semibold"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Aprofile;
