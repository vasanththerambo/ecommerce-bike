import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ _id, name, price, image }) => {

  return (
    <div className='product-list-item'>
      <Link to={`/products/${_id}`}>
        <img src={image} alt="product" />
        <h1>{name}</h1>
        <p>$ {price}</p>
        <button> View Details</button>
      </Link>
    </div>

  );
}

export default Product;
