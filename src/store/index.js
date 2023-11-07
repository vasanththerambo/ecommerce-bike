import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import productsReducer from './products/productsSlice';
import selectedProductReducer from './selectedProduct/selectedProductSlice';
import profileReducer from './profile/profileSlice';
import cartReducer from './cart/cartSlice';
import NotificationReducer from './notification/notificationSlice'
 

// middleware localstorage
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    profile: profileReducer,
    cart: cartReducer,
    notification:NotificationReducer
  },
  
  preloadedState: reHydrateStore(),
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([localStorageMiddleware]),
})



export default store;
