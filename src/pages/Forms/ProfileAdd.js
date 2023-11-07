import React, { useState ,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import { addUserProfile } from '../../store/profile/profileActions';
import { showNotification } from '../../store/notification/notificationSlice';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner/Spinner';


const ProfileAdd = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.auth.userInfo);

    const { loading, error, success } = useSelector(state => state.profile);


    let errorsObj = { fullName: '', email: '', dob: '', contactNumber: '', address: '' };

    const [errors, seterrors] = useState({ errorsObj });

    const [fullName, setfullName] = useState('');
    const [email, setemail] = useState(userInfo.email);
    const [dob, setdob] = useState('');
    const [contactNumber, setcontactNumber] = useState('');
    const [address, setaddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };


        if (fullName === '') {
            errorObj.fullName = 'Full Name Is Required';
            error = true;
        }
        if (email === '') {
            errorObj.email = "email Is Required";
            error = true;
        }
        if (dob === '') {
            errorObj.dob = 'Date Of Birth Is Required';
            error = true;
        }
        if (contactNumber === '') {
            errorObj.contactNumber = 'Please Enter Your Contact Number';
            error = true;
        }
        if (address === '') {
            errorObj.address = 'Please Enter Your Full Address';
            error = true;
        }


        seterrors(errorObj);

        if (error) {
            return
        }
        else {
            const profileData = { fullName, email, dob, contactNumber, address };
            dispatch(addUserProfile(profileData));

        }

    }

    useEffect(() => {
        if (success) {
            dispatch(showNotification({ title: "Profile Added", message: "Your Profile is added successfuly", severity: "success" }));
            navigate('/profile');
        }
    }, [dispatch,navigate, success]);
    

  return (
      <div className='page-container'>
          <h1>Please Provide The Following Details</h1>
          {error && <Error>{ error}</Error>}
          <div className='page-main'>
              <form onSubmit={handleSubmit}>
                  <div className='row'>
                  <div className='col-6 col-s-6'>
                      <div className='profile-info'>
                              <h3 className='text-primary'>Personal Information</h3>
                              <div className='form-container'>
                                  <label htmlFor="name">Full Name :</label>
                                  <input className='form-input' type="text" name="name" id="name" placeholder='Enter Your Full name' value={fullName} onChange={(e) => setfullName(e.target.value)} />
                                  {errors.fullName && <div className='text-danger fs-12'>{errors.fullName}</div>}
                                  <label htmlFor="emal">email :</label>
                                  <input className='form-input' type="text" name="email" id="email" placeholder='Enter Your email Id' value={email} onChange={(e)=>setemail(e.target.value)} />
                                  {errors.email && <div className='text-danger fs-12'>{errors.email}</div>}
                                  <label htmlFor="dob">Date Of Birth :</label>
                                  <input className='form-input date' type="date" name="dob" id="dob" value={dob} onChange={(e)=>setdob(e.target.value)}/>
                                  {errors.dob && <div className='text-danger fs-12'>{errors.dob}</div>}
                              </div>    
                          </div>
                      </div>
                      <div className='col-6 col-s-6'>
                          <div className='profile-info'>
                              <h3 className='text-primary'>Contact Information</h3>
                              <div className='form-container'>
                                  <label htmlFor="contact-number">Contact No:</label>
                                  <input className='form-input' type="number" name="contact-number" id="contact-number" placeholder='enter your phone number' value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)} />
                                  {errors.contactNumber && <div className='text-danger fs-12'>{errors.contactNumber}</div>}
                                  <label htmlFor="address">Address</label>
                                  <textarea className='form-input' name="address" id="address" cols="30" rows="5" placeholder='Enter Your Full Address' value={address} onChange={(e) => setaddress(e.target.value)}></textarea>
                                  {errors.address && <div className='text-danger fs-12'>{errors.address}</div>}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='row'>
                      <div className='col-12 col-s-12'>
                          <div className='profile-info'>
                              <p className='form-button-container'><button type='submit' className='form-button'>{ loading?<Spinner/>: "Submit"}</button></p>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  );
}

export default ProfileAdd;
