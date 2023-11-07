import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import { getSingleProduct } from '../../store/selectedProduct/selectedProductActions';
import { addToCart } from '../../store/cart/cartSlice'
import{showNotification} from '../../store/notification/notificationSlice'
import Error from '../../components/Error';
import LoadingScreen from '../../components/LoadingScreen'

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, selectedProduct, error } = useSelector(state => state.selectedProduct);
    const { cart } = useSelector(state => state.cart);
    
    const [isInCart, setisInCart] = useState(false);
    
    useEffect(() => {
        dispatch(getSingleProduct( id ));
    }, [dispatch, id]);

    useEffect(() => {
        const existItem = cart.find(item => item.id === id);
        if (existItem) {
            setisInCart(true);
        }
    },[cart,id])
    
  

    if (selectedProduct) {
        const { name, image, brand, price, offer, engine, power, torque } = selectedProduct;

        const handleAddToCart = () => {
            dispatch(addToCart({ id, name, price }));
            dispatch(showNotification({title: "Added to Cart", message: "given item is added to cart", severity: "info"}))
        }
        
        return (
            <div className='page-container'>
                <h1>{name}</h1>
                {error && <Error>{error}</Error>}
                <div className='page-main'>
                    {loading ? <LoadingScreen /> :
                        <div className='row'>
                            <div className='col-4 col-s-4'>
                                <div className='aside'>
                                    <img src={image} alt="bike" className='product-pic' />
                                    <p>Buy This Product</p>
                                    {isInCart ?<button className='change-profile-pic-disabled' disabled >Already Added </button>
                                    :<button className='change-profile-pic' onClick={handleAddToCart}>Add To Cart</button>}

                                </div>
                            </div>
                            <div className='col-8 col-s-8'>
                                <div className='profile-info'>
                                    <h3 className='text-primary'>General Details</h3>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Brand:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            {brand}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Price:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            ${price}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Offer:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            {offer} %
                                        </div>
                                    </div>
                                    <h3 className='text-primary'>Specifications</h3>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Engine Capacity:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            {engine}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Power:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            {power} bhp
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 col-s-3'>
                                            Torque:
                                        </div>
                                        <div className='col-9 col-s-9'>
                                            {torque} Nm
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
    
}

export default SingleProduct;
