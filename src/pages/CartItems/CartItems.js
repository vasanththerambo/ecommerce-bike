import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';

import './CartItems.css';
import CartItem from '../../components/Cart/CartItem/CartItem';
import PlaceOrder from '../../components/Cart/PlaceOrder/PlaceOrder';


const CartItems = () => {
  
  const { cart } = useSelector(state => state.cart);
  
  const [isCartEmpty, setisCartEmpty] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setisCartEmpty(true);

    }
  }, [cart]);

  let total = 0;

  cart.forEach(item => {
    total = total + item.totalPrice;
  })
  

  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>
      {isCartEmpty && <h3>Your Cart is Empty</h3>}
      {
        !isCartEmpty && cart.map((Item, idx) => {
          return (
            <CartItem key={idx}  {...Item} />
          )
        })
      }
     
      {
        !isCartEmpty && < PlaceOrder total={total} />

      }
    </div>
  );
}

export default CartItems;
