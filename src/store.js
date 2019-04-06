import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';
const SET_USERS = 'SET_USERS';
const SET_PRODUCTS = 'SET_PRODUCTS'

const users = (state=[], action)=> {
  switch(action.type){
    case SET_USERS:
      return action.data;
  }
  return state;
};

const products = (state=[], action)=> {
  switch(action.type){
    case SET_PRODUCTS:
      return action.data;
  }
  return state;
};

const reducer = combineReducers({
  users,
  products
});

const setProducts = (data)=> {
  return {
    data,
    type: SET_PRODUCTS
  };
};

const setUsers = (data)=> {
  return {
    data,
    type: SET_USERS
  };
};

export const fetchUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users') 
      .then(({ data })=> dispatch(setUsers(data))); 
  };
};

export const fetchProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products') 
      .then(({ data })=> dispatch(setProducts(data))); 
  };
};

export const updateProductManager = (productId, managerId)=> {
  return (dispatch)=> {
    return axios.put(`/api/products/${productId}`, { managerId: managerId || null}) 
      .then(({ data })=> dispatch(fetchProducts(data))); 
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
