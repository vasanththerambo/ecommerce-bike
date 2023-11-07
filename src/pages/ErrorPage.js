import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='page-container'>
          <h1>404 : Page Not Fount</h1>
          <Link to='/dashboard'> click here to go to home</Link>
    </div>
  );
}

export default ErrorPage;
