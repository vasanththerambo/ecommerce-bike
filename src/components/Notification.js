import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import {useDispatch} from 'react-redux'

import {resetNotification} from '../store/notification/notificationSlice'

const Notification = ({ title, severity, message }) => {
    const dispatch = useDispatch();

  return (
      <div>
          <Alert severity={severity} onClose={()=>dispatch(resetNotification())}>
              <AlertTitle>{ title}</AlertTitle>  
              <strong>{ message}</strong>
          </Alert>
      </div>
  );
}

export default Notification;
