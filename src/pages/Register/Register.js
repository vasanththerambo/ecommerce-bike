import React, { useState, useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector } from 'react-redux';

import { registerUser } from '../../store/auth/authActions'
import Spinner from '../../components/Spinner/Spinner'
import Error from '../../components/Error'
import './Register.css';

const Register = () => {

    const dispacth = useDispatch();
    const navigate = useNavigate();

    const { loading, userInfo, error, success } = useSelector(state => state.auth);
    

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [customError, setcustomError] = useState(null);

    const handleRegistration = (e) => {
        e.preventDefault();
        if (email && password && confirmPassword) {
            setcustomError('');
            if (password === confirmPassword) {
                setcustomError('');
                const data = { email, password };
                dispacth(registerUser(data));
            }
            else {
                setcustomError("password mismatch");
            }
        }
        else {
            setcustomError("enter mandatory fields");
        }

    }

    useEffect(() => {
        if (userInfo) {
            alert('User ready');
            navigate('/dashboard');
        }

        if (success && !error) {
            alert("success in registration");
            navigate('/login');
        }

    }, [error, navigate, success, userInfo]);
    

  return (
      <div className='register-container'>
          <h1>Register </h1>
          <form className='form-md' onSubmit={handleRegistration}>
              {error && <Error>{error}</Error>}
              {customError && <Error>{customError}</Error>}
              
              {/* <label htmlFor="full-name">Full Name* </label>
              <input type="text" name="full-name" id="full-name" placeholder='enter your full name' /> */}
              <label htmlFor="email">email*</label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='enter your email id'
                  value={email}
                  onChange={(e) => setemail(e.target.value)} />
              <label htmlFor="password">Password*</label>
              <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder='*******'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)} />
              <label htmlFor="confirm-password">Confirm Password*</label>
              <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder='*******'
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)} />
              <button type="submit" disabled={loading} >{loading ? <Spinner/> : 'Register'}</button>
          </form>
          <p>existing user ? <Link to='/login' className='login-link'>click here to login</Link> </p>
          
      </div>
  );
}

export default Register;
