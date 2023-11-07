import { createSlice } from '@reduxjs/toolkit';

import {
    getUserProfile,
    addUserProfile,
    updateUserProfile,
    deleteUserProfile,
    updateProfilePic,
    deleteProfilePic
} from './profileActions';

const initialState = {
    
    loading: false,
    profile: null,
    error: null,
    success:false
}

const profileSlice = createSlice({

    name: 'profile',
    initialState,
    reducers: {
        resetProfile:()=>initialState
    },
    extraReducers: {
        //get user profile
        [getUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [getUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.profile = payload
            state.error = null
            state.success =false
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },

        // add user profile
        [addUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [addUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.profile = payload
            state.success = true
            state.error = null
        },
        [addUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // update user profile
        [updateUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        [updateUserProfile.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.profile = payload
            state.error = null
            state.success =true
        },
        [updateUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // delete user profile
        [deleteUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
            
        },
        [deleteUserProfile.fulfilled]: (state) => {
            state.loading = false
            state.error = null
            state.success =true
        },
        [deleteUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // update profile pic
        [updateProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [updateProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.profile = payload
            state.error = null
            state.success =true
        },
        [updateProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // delete profile pic
        [deleteProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.profile = payload
            state.error = null
            state.success =true
        },
        [deleteProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        }


    }
})

export const { resetProfile } = profileSlice.actions; 

export default profileSlice.reducer;


