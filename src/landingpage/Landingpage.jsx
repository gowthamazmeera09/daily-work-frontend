import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function Landingpage() {
  
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Landingpage;