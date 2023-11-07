import React from 'react';
import { Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
          <Link to='/dashboard' className='navbar-item'>Dash board</Link>
          <Link to='/about' className='navbar-item'>About Us</Link>
          <Link to='/profile' className='navbar-item'>Profile</Link>
          <Link to='/products' className='navbar-item'>Bikes</Link>
    </div>
  );
}

export default Navbar;
