import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';

import {requestResetPassword} from '../../store/auth/authActions'
import Error from '../../components/Error';
import Spinner from '../../components/Spinner/Spinner'

import './ForgotPassword.css'


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { loading ,error,message} = useSelector(state => state.auth);

  
  let errorsObj = { email: '' };

  const [errors, seterrors] = useState({ errorsObj });
  
  const [email, setemail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (email === '') {
      
      errorObj.email = 'email is required';
      error = true;
    }

    seterrors(errorObj);

    if (error) {
      return
    }
    else {
      dispatch(requestResetPassword({ email }));
    }
  
  }

  useEffect(() => {
    if (message === "success") {
      navigate('/password-mailsend-status');

    }
  }, [message, navigate]);
  
  return (
    <div className='forgot-password-container'>
      <h1>Reset Password</h1>
      <form className='form-md' onSubmit={handleForgotPassword}>
        {error && <Error>{ error}</Error>}
        <p className='forgot-password-message'>Lost your password ? Please Enter Your email Address. You will receive a link to create new password via email </p>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" placeholder='enter your email Id' value={email} onChange={(e)=>setemail(e.target.value)} />
        {errors.email && <div className='text-danger fs-12'>{errors.email}</div>}
        <button type="submit">{loading?<Spinner/>:"Reset Password"}</button>
      </form>
      <p><Link to='/login' className='login-link'> click here to login</Link></p>  
    </div>
  );
}

export default ForgotPassword;
