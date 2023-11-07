import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Constants } from '../../config/constants';

export const getProducts = createAsyncThunk(
    'products/getproducts',
    async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            
            const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }

            const { data } = await axios.get(Constants.url_products, config);

            return data.data
            

        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return err.response.data.message;
            }
            else {
                return err.message;
            }
        }
    }

)

