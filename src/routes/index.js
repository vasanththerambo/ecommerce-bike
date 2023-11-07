import { Navigate } from 'react-router-dom'; 

//authentication pages

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

// Account Related Pages

import Dashboard from '../pages/Dashboard/Dashboard';
import About from '../pages/About/About';
import Profile from '../pages/Profile/Profile';

// Ecommerce pages

import Products from '../pages/Products/Products';
import SingleProduct from '../pages/Products/SingleProduct';
import CartItems from '../pages/CartItems/CartItems';

//Forms

import ProfileAdd from '../pages/Forms/ProfileAdd';
import ProfileUpdate from '../pages/Forms/profileUpdate';

// Status Pages
import DeleteProfile from '../pages/DeleteProfile/DeleteProfile';
import PasswordUpdateSuccess from '../pages/PasswordUpdateSuccess/PasswordUpdateSuccess';
import PasswordMailsendSuccess from '../pages/PasswordMailsendSuccess/PasswordMailsendSuccess';

// Error pages

import ErrorPage from '../pages/ErrorPage';

const authProtectedRoutes = [
    
    // Account related pages
    
    { path: '/dashboard', element: Dashboard },
    { path: '/about', element: About },
    { path: '/Profile', element: Profile },
    
    // Ecommerce pages

    { path: '/products', element: Products },
    { path: '/cart-items', element: CartItems },
    { path: '/', element: () => <Navigate to='/dashboard' /> },
    { path: '/products/:id', element: SingleProduct },

    // Forms
    { path: '/profile-add', element: ProfileAdd },
    { path: '/profile-update', element: ProfileUpdate },
    { path: '/profile-delete', element: DeleteProfile }
 
];

const publicRoutes = [
    { path: '/login', element: Login },
    { path: '/register', element: Register },
    { path: '/forgot-password', element: ForgotPassword },
    { path: '/reset-password', element: ResetPassword },
    { path: '/password-update-status', element: PasswordUpdateSuccess },
    { path: '/password-mailsend-status', element: PasswordMailsendSuccess },
    
    // Error pages

    { path: '*', element: ErrorPage }

]

export {publicRoutes ,authProtectedRoutes}