import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector ,useDispatch } from 'react-redux';

import { resetAuth } from '../../store/auth/authSlice';
import { resetProducts } from '../../store/products/productsSlice';
import { restSelectedProduct } from '../../store/selectedProduct/selectedProductSlice';
import { resetProfile } from '../../store/profile/profileSlice';
import { resetNotification } from '../../store/notification/notificationSlice';
import './Header.css';
import Cart from '../Cart/Cart';
import Navbar from '../Navbar/Navbar';
import Notification from '../Notification';

const Header = () => {
    
    const dispatch = useDispatch();
    
    const { email } = useSelector(state => state.auth.userInfo);
    const { isNotification, title, message, severity } = useSelector(state => state.notification);


    const handleLogout = () => {
        dispatch(resetProducts());
        dispatch(restSelectedProduct());
        dispatch(resetProfile());
        dispatch(resetNotification());
        dispatch(resetAuth());

    }
    

  return (
      <div className='header-nav'>
          <div style={{margin:"0.5rem"}}>
              {isNotification &&<Notification title={title} message={message} severity={severity} />}
          </div>
          <div className='header-list'>
              <h2>Your Dream : Now Reality</h2>
              <div>
                 <Link to='/cart-items' > <Cart /> </Link> 
              </div>
              <div>
                  <p>{email||'usermail@domain.com'}</p>
                 <p><button className='btn-logout' onClick={handleLogout}>Logout</button></p>
              </div>
          </div>
          <Navbar/>
      </div>
  );
}

export default Header;
