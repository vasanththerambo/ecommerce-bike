import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { deleteUserProfile } from '../../store/profile/profileActions';
import { showNotification } from '../../store/notification/notificationSlice';
import Spinner from '../../components/Spinner/Spinner'
import Error from '../../components/Error'

const DeleteProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = useSelector(state => state.profile.profile._id);
    const { loading, error, success } = useSelector(state => state.profile);
    
    

    const handleCancel = () => {
        navigate('/profile');
    }

    const handleDelete = () => {
        dispatch(deleteUserProfile(id));

    }

    useEffect(() => {
        if (success) {
            dispatch(showNotification({ title: "Profile Deleted", message: "Your Profile is deleted ", severity: "error" }));
            navigate('/profile');

        }
    }, [dispatch, navigate, success]);


  return (
      <div className='page-container'>
          <h1>Delete Your Profile</h1>
          {error && <Error>{ error}</Error>}
          <div className='main'>
              <div className='delete-profile-container'>
                  <h2 className='text-danger'>Are Your Sure You Want To Delete Your Profile</h2>
                  <div >
                      <button className='btn-sm primary' onClick={handleDelete}>{loading ? <Spinner/>:"Delete"}</button>
                      <button className='btn-sm danger' onClick={handleCancel} >Cancel</button>
                  </div>

              </div>
          </div>
      </div>
  );
}

export default DeleteProfile;
