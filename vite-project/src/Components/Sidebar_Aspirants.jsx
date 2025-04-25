import React from 'react'
import { Link } from "react-router-dom";
import { Home, Phone, Search, User, Gift, LogOut } from "lucide-react";
import axios from 'axios';

function Sidebar_Aspirants() {

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/logout', { withCredentials: true })
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => console.error('Logout failed:', err));
  };

  return (
    <>
      <div className="w-64 fixed top-0 left-0 h-screen bg-black p-4 border-r text-white z-50">
        <div className="mb-6">
            <Link to= "/">
            <div className="text-xl font-bold">CampusBuddy</div>
            </Link>
          
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard/aspirants"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/dashboard/aspirants/bookings"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Phone size={20} />
            Bookings
          </Link>

          <Link
            to="/dashboard/aspirants/findpeople"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Search size={20} />
            Find People
          </Link>

          <Link
            to="/dashboard/aspirants/profile"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <User size={20} />
            Profile
          </Link>

          <Link
            to="/dashboard/achievements/rewards"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Gift size={20} />
            Rewards
          </Link>
          <button onClick={handleLogout}
          className='flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 text-red-500'
          > 
            <LogOut size={20} />
            Logout
          </button>
        </div>
        

      </div>
    </>
  );
}

export default Sidebar_Aspirants;
