import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { Constants } from '../../config/constants';
 const token = JSON.parse(localStorage.getItem('token'));
            
            const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }

export const getUserProfile = createAsyncThunk(
    'profile/getUserProfile',
    async (email, { rejectWithValue }) => {
        
        try {
            
            const { data } = await axios.get(Constants.url_profile, config);
            let userProfile = null;
            if (data) {
                userProfile = data.data.find(profile => profile.email === email);
            }
            
            return userProfile;

        }
        catch (err) {

            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }

        }
    }
)

export const addUserProfile = createAsyncThunk(
    
    'profile/addUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(Constants.url_profile, profileData, config)
            
            return data.data;


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
        
        try {
            
            const id = profileData.id;
            const { data } = await axios.patch(`${Constants.url_profile}/${id}`, profileData, config);
            return data.data;

        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const deleteUserProfile = createAsyncThunk(
    'profile/deleteUserProfile',
    async (id, { rejectWithValue }) => {
        
        try {
             await axios.delete(`${Constants.url_profile}/${id}`, config);
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const updateProfilePic = createAsyncThunk(
    'profile/updateProfilePic',
    async ({ profileData ,_id}, { rejectWithValue }) => {
        try {
            
            const customConfig = {
                 headers: {
                    'authorization': `Bearer ${token}`,
                     "Content-type": "multipart/form-data"
                }
            }

            const { data } = await axios.patch(`${Constants.url_profilePic}/${_id}`, profileData, customConfig);

            if (data.data) {
                return data.data;
            }
            else {
                const response = await axios.get(`${Constants.url_profile}/${_id}`, config);
                response.data.data.message = data.message;
                return (response.data.data);
                
                
            }

            


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const deleteProfilePic = createAsyncThunk(
    'profile/deleteProfilePic',
    async (_id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${Constants.url_profilePic}/${_id}`, config);
            return data.data;
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

