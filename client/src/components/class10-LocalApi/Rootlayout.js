import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

function Rootlayout() {
  return (
    <div>
      <Navbar/>
      {/* place holder component */}
      
      <div style={{height:"82.5vh"}} className="main-body">

      <Outlet/>
      </div>
      
    </div>
  )
}

export default Rootlayout