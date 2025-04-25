import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { useState } from 'react';
import Navbar from '../Components/Navbar';

function Home() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
 <Navbar/>
<div className="pt-25 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 text-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-800 mb-4"
      >
        CampusBuddy
      </motion.h1>

      {/* Typewriter text */}
      <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6">
        <Typewriter
          words={['Clear,', 'simple —', 'ask someone who’s already there!']}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </p>

      {/* Bouncing subtext */}
      <p className="text-lg sm:text-xl text-gray-600 animate-bounce">
        Insights from real students
      </p>
      
      


    </div>
    
    </>
   
  )
}

export default Home
