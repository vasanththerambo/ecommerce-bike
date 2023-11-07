import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
    isNotification: false,
    title: "",
    message: "",
    severity:""
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            const { title, message, severity } = action.payload;
            return { ...state, isNotification:true,title, message, severity };

        },
        resetNotification:()=> initialState
        
    }
})

export const { showNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
