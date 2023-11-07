import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {resetAuth} from '../../store/auth/authSlice'

const PasswordMailsendSuccess = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuth());

  }, [dispatch]);
  

  return (
    <div>
      <div className='page-container'>
          <div className='page-main'>
              <h1>Password Reset Link Status </h1>  
              
              <div style={{padding:"6rem 1rem"}}>
                    <div className='alert success'>
                      <strong>Link sent Successfully  !!!</strong> please check your mail
                      
                    </div>
                </div>
          </div>
      </div>
      
    </div>
  );
}

export default PasswordMailsendSuccess;
