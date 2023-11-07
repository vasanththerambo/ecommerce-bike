import React from 'react';
import { useDispatch } from 'react-redux';

import { addToCart, removeFromCart } from '../../../store/cart/cartSlice';
import { showNotification} from '../../../store/notification/notificationSlice';
import './CartItem.css';

const CartItem = ({ id, name, price, totalPrice, quantity }) => {
  
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price }));
    dispatch(showNotification({ title: "Added to Cart", message: "given item is added to cart", severity: "info" }));

  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
    dispatch(showNotification({ title: "Removed from Cart", message: "given item is removed from cart", severity: "error" }));
  }

  return (
    <div className='cart-item'>
      <h2>{name}</h2>
      <p>${price}</p>
      <p>{quantity}</p>
      <p>Total : $ {totalPrice}</p>
      <button className='cart-item-inc' onClick={handleAddToCart}>+</button>
      <button className='cart-item-dec' onClick={handleRemoveFromCart}>-</button>
    </div>
  );
}

export default CartItem;
