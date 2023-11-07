import React from 'react';
import { useDispatch } from 'react-redux';

import { showNotification } from '../../../store/notification/notificationSlice';
import { resetCart } from '../../../store/cart/cartSlice';

import './PlaceOrder.css';



const PlaceOrder = ({ total }) => {
  const dispatch = useDispatch();

  
  const handlePlaceOrder = () => {
    dispatch(showNotification({ title: "Order Placed", message: "your order  is placed", severity: "success" }));
    dispatch(resetCart());
    
  }

  return (
      <div className='place-order'>
      <h4>Total Price : $ {total }</h4>
          <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
  );
}

export default PlaceOrder;
