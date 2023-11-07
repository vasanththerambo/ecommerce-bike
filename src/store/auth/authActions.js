import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Constants }  from '../../config/constants';

const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
}
            

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        
        try {
            

            const {data} = await axios.post(
                Constants.url_login,
                { email, password },
                config
            )
            
            const token = data.token;

            // localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', JSON.stringify(token));
            

            return data
            
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


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        
        try {
            
            await axios.post(
                Constants.url_register,
                { email, password },
                config
            )
            
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

export const requestResetPassword = createAsyncThunk(
    'auth/requestResetPassword',
    async ({ email }, { rejectWithValue }) => {
        
        try {
            
            const { data } = await axios.post(Constants.url_requestResetPassword, { email }, config);

            
            if (data.message) {
                return data.message
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

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, { rejectWithValue }) => {
        
        try {
            const { data } = await axios.post(`${Constants.url_resetPassword}`, payload, config);
            if (data) {
                return data
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