import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo192.png';
import '../class10-LocalApi/navbar.css'

const NavPage = () => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <header>
      <div><img src={logo} alt="Logo" id="logo" /></div>
      <div className="menu">
        <button id="navButton" onClick={toggleNav}>⋮</button>
        <div className="containerNavMenu" style={{ display: navVisible ? 'block' : 'none' }}>
          <nav id="navMenu">
            <ul>
            <li><NavLink to="" className="nav-link">Find Plant</NavLink></li>
            <li><NavLink to="plantinfo" className="nav-link">About Plant</NavLink></li>
    
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavPage;