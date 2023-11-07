import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';

import { userLogin} from '../../store/auth/authActions';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error';
import './Login.css';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, error } = useSelector(state => state.auth);

  
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [customError, setcustomError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email && password) {
      setcustomError('');
      const data = { email, password };
      dispatch(userLogin(data));
    }
    else {
      setcustomError('at least one field is empty');
    }

  }

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);
  

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form className='form-md' onSubmit={handleLogin}>
        {error && <Error>{ error}</Error>}
        {customError && <Error>{ customError}</Error>}
        <label htmlFor="email">email*</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder='enter your email Id'
          value={email}
          onChange={(e) => setemail(e.target.value)} />
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder='enter your password'
          value={password}
          onChange={(e) => setpassword(e.target.value)} />
        <button type='submit' disabled={loading}>{ loading? <Spinner/>:'login' }</button>
      </form>
      <p>new user ? <Link to='/register' className='login-link'>click here to register</Link> </p>
      <p style={{fontSize:"1rem"}}>forgot password ? <Link to='/forgot-password' className='login-link' >click here to reset your password</Link></p>
    </div>
  );
}



export default Login;
