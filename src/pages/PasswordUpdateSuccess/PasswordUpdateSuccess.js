import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

import { resetAuth } from '../../store/auth/authSlice';

const PasswordUpdateSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuth());
    
  }, [dispatch]);

  return (
      <div className='page-container'>
          <div className='page-main'>
              <h1>Password Update Status</h1>  
              
              <div style={{padding:"6rem 1rem"}}>
                  <Link to='/login'>
                    <div className='alert success'>
                      <strong>Password Updated  !!!</strong> please click to login 
                      
                    </div>
                  </Link>
                </div>
          </div>
      </div>
      
  );
}

export default PasswordUpdateSuccess;
