import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import { fetchProducts, fetchUsers } from './store';
import Home from './Home';
import Users from './Users';
import Products from './Products';
import Nav from './Nav';

class App extends Component{
  componentDidMount(){
    this.props.fetchData();

  }
  render(){
    return (
      <Router>
        <Fragment>
          <h1>Acme Product Managers</h1>
          <Route component={ Nav } />
          <Route path='/' exact component={ Home } />
          <Route path='/users' component={ Users } />
          <Route path='/products' component={ Products } />
        </Fragment>
      </Router>
    );
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    fetchData : ()=> {
      dispatch(fetchProducts());
      dispatch(fetchUsers());
    }
  };
};


export default connect(null, mapDispatchToProps)(App);
