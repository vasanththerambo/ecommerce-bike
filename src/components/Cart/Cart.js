import React from 'react';
import { useSelector } from 'react-redux';

import './Cart.css';



const Cart = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <div className='cart-header'>
      <h2>Cart : {totalQuantity} Items</h2>
    </div>
  );
}

export default Cart;
