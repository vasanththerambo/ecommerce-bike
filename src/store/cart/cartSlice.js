import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    totalQuantity:0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existItem = state.cart.find(item => item.id === newItem.id);

            if (existItem) {
                existItem.quantity++;
                existItem.totalPrice+=newItem.price
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, {
                        id: newItem.id,
                        name: newItem.name,
                        quantity: 1,
                        price: newItem.price,
                        totalPrice:newItem.price
                    }],
                    totalQuantity:state.totalQuantity+1
                }
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existItem = state.cart.find(item => item.id === id);

            if (existItem.quantity === 1) {
                const newItems = state.cart.filter(item => item.id !== id);
                return { ...state, cart: newItems, totalQuantity: state.totalQuantity - 1 }
                
            }
            else {
                existItem.quantity--
                existItem.totalPrice -= existItem.price
            }
        },
        resetCart: () => initialState
    }
    
})

export const { resetCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
