import { createSlice } from '@reduxjs/toolkit';

import { getSingleProduct } from './selectedProductActions';


const initialState = {
    loading: false,
    selectedProduct: null,
    error:false
}

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        restSelectedProduct:()=>initialState
    },
    extraReducers: {
        // get single product
        [getSingleProduct.pending]: (state) => {
            state.loading = true
            state.error=null
        },
        [getSingleProduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.selectedProduct = payload
            state.error=null
        },
        [getSingleProduct.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
    
})

export const { restSelectedProduct } = selectedProductSlice.actions;


export default selectedProductSlice.reducer