import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Constants } from '../../config/constants';

export const getSingleProduct = createAsyncThunk(
    'selectedProduct/getSingleProduct',
    async (id , { rejectWithValue }) => {
        try {
            
            const token = JSON.parse(localStorage.getItem('token'));

            const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }

            const { data } = await axios.get(`${Constants.url_products}/${id}`, config);
            
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

