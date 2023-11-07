import React, { useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux';
// import { productData } from '../../data/productData';
import LoadingScreen from '../../components/LoadingScreen';
import Error from '../../components/Error';
import Product from '../../components/Product/Product';
import {getProducts} from '../../store/products/productsActions'

const Bikes = () => {

  const dispatch = useDispatch();
  // const token = JSON.parse(localStorage.getItem('token'));

  const { loading, products, error } = useSelector(state => state.products);
  
  
  useEffect(() => {
    
    dispatch(getProducts());

    
  }, [dispatch]);
  
 

    return (
    <div className='page-container'>
        <h1>Bikes</h1>
        {error && <Error>{error }</Error>}
      <div className='page-main'>
        <div className='product-list'>
            {
              loading ? <LoadingScreen/> : products && products.map((product, idx) => <Product key={idx} {...product} />)   
            }
        </div>
        
      </div>
    </div>
  );

  
}

export default Bikes;
