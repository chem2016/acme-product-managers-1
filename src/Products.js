import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import Product from './Product';


const Products = ({ products, users })=> {
  return (
    <ul className='list-group'>
    {
      products.map( item => (
        <li key={ item.id } className='list-group-item'>
          <Product product={ item }/>
        </li>
      ))
    }
    </ul>
  );
};

const mapStateToProps = ({ products })=> {
  return {
    products,
  };
};
export default connect(mapStateToProps)(Products);

