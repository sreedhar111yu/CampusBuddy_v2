import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { Home, Phone, Search, User, Gift, Calendar,LogOut  } from "lucide-react";

function sidebar_Mentees() {

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/auth/mentee/logout', { withCredentials: true })
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
            to="/dashboard/mentees"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/dashboard/mentees/booked"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Phone size={20} />
            Booked
          </Link>

          <Link
            to="/dashboard/mentees/calander"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Calendar size={20} />
            Calander
          </Link>

          <Link
            to="/dashboard/mentees/profile"
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
          className='flex w-full items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 text-red-500'
          > 
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
   </>
  )
}

export default sidebar_Mentees