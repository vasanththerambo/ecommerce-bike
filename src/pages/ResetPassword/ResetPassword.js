import React ,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetPassword } from '../../store/auth/authActions';
// import { showNotification } from '../../store/notification/notificationSlice';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner/Spinner';
import './ResetPassword.css'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const id = queryParameters.get("id");

    const { loading, error, success } = useSelector(state => state.auth);

    console.log(loading);

    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [customError, setcustomError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password && confirmPassword) {
            setcustomError('');
            if (password === confirmPassword) {
                setcustomError('');
                const payload = {
                    userId:id,
                    password,
                    token
                }

                dispatch(resetPassword(payload));

            }
            else {
                setcustomError('Password Mismatch');
            }
        }
        else {
            setcustomError('At least One Field is Empty');
        }


    }

    useEffect(() => {
        if (success) {
            // dispatch(showNotification({ title: "Password Updated", message: "Your password is updated successfuly", severity: "success" }));
            navigate('/password-update-status');
        }
        
    },[dispatch,navigate,success])

  return (
      <div className='reset-container'>
          <h1>Reset Password</h1>
          <form className='form-md' onSubmit={handleResetPassword}>
              {error && <Error>{error}</Error>}
              {customError && <Error>{customError}</Error>}
              <label htmlFor="password">New Password :</label>
              <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder='Enter your New Password'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)} />
              <label htmlFor="confirm-password">Confirm Password :</label>
              <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder='Confirm your Password'
                  value={confirmPassword}
                  onChange={(e)=>setconfirmPassword(e.target.value)}
              />
              <button type='submit'>{loading?<Spinner/>:"Reset"}</button>
          </form>
      </div>
    
  );
}

export default ResetPassword;
