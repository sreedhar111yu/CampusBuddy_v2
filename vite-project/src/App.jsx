import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Discuss from './Pages/Discuss';
import Aspirants from './Pages/Aspirants';
import Mentees from './Pages/Mentees';
import Booking from './Pages/Booking';
import Findpeople from './Pages/Findpeople';
import Aprofile from './Pages/Aprofile';
import Mprofile from './Pages/Mprofile';




function App() {
  return (
   <>
  
   <BrowserRouter>
   

   <Routes>
   <Route path="/" element={<Home />} />
<Route path="/discuss" element={<Discuss />} />
<Route path="/profile" element={<Profile />} />
<Route path="/dashboard/aspirants" element={<Aspirants />} />
<Route path="/dashboard/aspirants/bookings" element={<Booking />} />
<Route path="/dashboard/aspirants/findpeople" element={<Findpeople />} />
<Route path="/dashboard/aspirants/profile" element={<Aprofile/>}/>
<Route path="/dashboard/mentees" element={<Mentees />} />
<Route path="/dashboard/mentees/profile" element={<Mprofile/>}/>

  
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
