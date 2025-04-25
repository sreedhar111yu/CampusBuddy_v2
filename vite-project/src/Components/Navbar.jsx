import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // For icons


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl bg-gray-900 dark:bg-gray-900 shadow-md flex items-center justify-center py-4 z-50 px-4 transition-all duration-300">
      
      {/* Logo */}
      <div className="absolute left-4 text-xl font-bold text-white dark:text-white">
        CAPUSBUDDY
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-lg text-white dark:text-gray-200">
        <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
        <a href="/discuss" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Discuss</a>
        <a href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</a>
      </div>
      <div className=" absolute right-16 text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Dashboard
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
          <button
  onClick={async () => {
    try {
      const res = await fetch('http://localhost:5000/check-auth', {
        credentials: 'include'
      });
      const data = await res.json();

      if (data.user) {
        window.location.href = '/dashboard/aspirants';
      } else {
        window.location.href = 'http://localhost:5000/auth/google';
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      window.location.href = 'http://localhost:5000/auth/google';
    }
  }}
  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
>
  Aspirants
</button>
            <a
              href="/dashboard/mentees"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mentees
            </a>
           
          </div>
        </div>
      )}
    </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden absolute right-4 text-gray-100 dark:text-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-gray-900 dark:bg-gray-800 rounded-md shadow-lg flex flex-col items-center space-y-4 py-4 md:hidden text-gray-100 dark:text-gray-200 transition-all duration-300">
          <a href="/" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/discuss" onClick={() => setIsOpen(false)}>Discuss</a>
          <a href="#" onClick={() => setIsOpen(false)}>Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
