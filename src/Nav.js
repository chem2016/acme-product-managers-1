import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { findManagers } from './utils';

const Nav = ({ managers, location : { pathname }})=> {
  console.log(pathname);
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/users', label: `Managers (${managers.length})` },
  ];
  return (
    <ul className='nav nav-pills' style={{ marginBottom: '20px'}}>
    {
      links.map( link => (
        <li key={ link.to } className={`nav-item${ pathname === link.to ? ' active': ''}`}>
          <Link to={ link.to }  className={`nav-link${ pathname === link.to ? ' active': ''}`}>{ link.label }</Link>
        </li>
      ))
    }
    </ul>
  );
};

const mapStateToProps = (state)=> {
  return {
    managers: findManagers(state)
  };
};

export default connect(mapStateToProps)(Nav);
