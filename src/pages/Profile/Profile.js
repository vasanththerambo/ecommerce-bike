import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserProfile, updateProfilePic, deleteProfilePic } from '../../store/profile/profileActions';
import defaultProfilePic from '../../assets/images/defaultProfile.png';
import LoadingScreen from '../../components/LoadingScreen';
import Error from '../../components/Error';
import { monthData } from '../../data/monthData';
const Profile = () => {

  const dispatch = useDispatch();
  const { email } = useSelector(state => state.auth.userInfo);
  
  const { loading, profile, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getUserProfile(email));
  }, [dispatch, email]);

  

  let errorsObj = { currentProfilePic: '' };
  const [errors, seterrors] = useState({ errorsObj });

  const [isAddProfilePic, setisAddProfilePic] = useState(false);
  const [isUpdateProfilePic, setisUpdateProfilePic] = useState(false);
  const [currentProfilePic, setcurrentProfilePic] = useState(null);
  
 
  if (profile) {
    const {_id, fullName, dob, contactNumber, address ,profilePic } = profile;
    const dateOfBirth = new Date(dob);
    const dobDay = dateOfBirth.getDate();
    const dobMonth = dateOfBirth.getMonth();
    const dobYear = dateOfBirth.getFullYear();

    const handleFileChange = (e) => {
      setcurrentProfilePic(e.target.files[0]);
    }

    const handleAddProfilePic = (e) => {
      e.preventDefault();
      
      let error = false;

      const errorObj = { ...errorsObj };

      if (currentProfilePic === '' || currentProfilePic === null || currentProfilePic === undefined) {
        errorObj.currentProfilePic = 'Please Select a File';
        error =true
      }

      seterrors(errorObj);

      if (error) {
        return
      }

      else {

        const profileData = new FormData();
        profileData.append('profilePic', currentProfilePic);
        setisAddProfilePic(false);
        setisUpdateProfilePic(false);
        dispatch(updateProfilePic({ profileData, _id }));
      }


    }
    
    const handleDeleteProfilePic = (e) => {
      e.preventDefault();
      setisAddProfilePic(false);
      setisUpdateProfilePic(false);
      dispatch(deleteProfilePic(_id));
    }


    return (
      <div className='page-container'>
        <h1>Your Profile </h1>
        <div className='page-main'>
          {error && <Error>{error}</Error>}
          {profile.message && <Error>{profile.message }</Error>}
          { loading? <LoadingScreen/> :
            <div className='row'>
              <div className='col-4 col-s-4'>
                <div className='aside'>
                  <img className='profile-pic' src={profilePic||defaultProfilePic} alt="profile" />
                  <div className='general-link text-success'>{profilePic?<p onClick={()=>setisUpdateProfilePic(true)}>Change Your Profile Picture</p>: <p onClick={()=>setisAddProfilePic(true)} >Add Profile Picture</p> }</div>
                  {
                    isAddProfilePic ?
                      <form onSubmit={handleAddProfilePic} encType='multipart/form-data'>
                        <div className='row'>
                          <div className='col-8 col-s-8'>
                            <input type="file" name="profile-pic" id="profile-pic" style={{ margin: "1rem" }} onChange={handleFileChange} />
                            {errors.currentProfilePic && <div className='text-danger fs-12'>{errors.currentProfilePic}</div>}
                          </div>
                          <div className='col-4 col-s-4'>
                            <button type='submit' className='btn-lg primary'>Add</button> 
                            <div className='general-link text-danger' onClick={()=>setisAddProfilePic(false)}>cancel</div>
                          </div>
                        </div>
                      </form>
                        
                       : ""
                    
                  }
                  {
                    isUpdateProfilePic ?
                       <form encType='multipart/form-data' onSubmit={handleAddProfilePic}>
                        <div className='row'>                       
                          <div className='col-6 col-s-6'>
                            <input type="file" name="profile-pic" id="profile-pic" style={{ margin: "1rem" }} onChange={handleFileChange} />
                            {errors.currentProfilePic && <div className='text-danger fs-12'>{errors.currentProfilePic}</div>}
                          </div>
                          <div className='col-3 col-s-3'>
                            <button type='submit' className='btn-lg primary'>Update</button> 
                          </div>
                       
                         <div className='col-3 col-s-3'>
                            <button className='btn-lg danger' onClick={handleDeleteProfilePic}>Delete</button> 
                            <div className='general-link text-danger' onClick={()=>setisUpdateProfilePic(false)}>cancel</div>
                          </div>
                        </div>
                      </form>
                       : ""
                    
                  }
                
                </div>
              </div>
              <div className='col-8 col-s-8'>
                <div className='profile-info'>
                  <h3 className='text-primary'>Personal Information</h3>
                  <div className='row'>
                    <div className='col-3 col-s-3'>Name:</div>
                    <div className='col-9 col-s-9'> { fullName }</div>
                  </div>
                  <div className='row'>
                    <div className='col-3 col-s-3'>email:</div>
                    <div className='col-9 col-s-9'> { email}</div>
                  </div>
                  <div className='row'>
                    <div className='col-3 col-s-3'>Date Of Birth:</div>
                    <div className='col-9 col-s-9'> {dobDay}-{monthData[dobMonth]}-{ dobYear} </div>
                  </div>
                  <h3 className='text-primary'>Contact Information</h3>
                  <div className='row'>
                    <div className='col-3 col-s-3'>Contact Number: </div>
                    <div className='col-9 col-s-9'> { contactNumber}</div>
                  </div>
                  <div className='row'>
                    <div className='col-3 col-s-3'>Address:</div>
                    <div className='col-9 col-s-9'> { address}</div>
                  </div>
                </div>
                <div style={{ margin: "1rem" }}>
                  <Link to='/profile-update'>
                    <div className='alert success'>
                      <strong>Update Your Profile !!</strong> click here to update your profile
                    </div>
                  </Link>
                </div>
                <div style={{ margin: "1rem" }}>
                  <Link to='/profile-delete'>
                    <div className='alert danger'>
                      <strong>Delete Your Profile !!</strong> click here to delete your profile
                    </div>
                  </Link>
                  
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='page-container'>
        <div className='page-main'>

          {
            loading?<LoadingScreen/>:
              <div>
                {error && <Error>{error}</Error>}
                <div style={{padding:"6rem 1rem"}}>
                  <Link to='/profile-add'>
                    <div className='alert primary'>
                      <strong>profile not found !!!</strong> please fill up your profile 
                      
                    </div>
                  </Link>
                </div>
                
                
            </div>
          }
          
        </div>

      </div>
    )
  }
}

export default Profile;
