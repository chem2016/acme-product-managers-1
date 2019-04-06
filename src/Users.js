import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { findManagers } from './utils';

const Users = ({ users })=> {
  return (
    <ul>
    {
      users.map( item => (
        <li key={ item.id }>
          {
            item.name
          }
        </li>
      ))
    }
    </ul>
  );
};

const mapStateToProps = ({ users, products })=> {
  return {
    users : findManagers({ users, products})
  };
};
export default connect(mapStateToProps)(Users);
