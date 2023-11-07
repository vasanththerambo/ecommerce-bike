import { createSlice } from '@reduxjs/toolkit';

import {getProducts} from './productsActions'

const initialState = {
    
    loading: false,
    products: null,
    error:null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts:()=>initialState
    },
    extraReducers: {
        //get products
        [getProducts.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getProducts.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.products = payload
            state.error = false
        },
        [getProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
        
    }

})

export const { resetProducts } = productsSlice.actions;

export default productsSlice.reducer;

