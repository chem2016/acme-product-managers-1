import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductManager } from './store';

class Product extends Component{
  constructor(props){
    super(props);
    this.state = {
      managerId: this.props.product.managerId || '' 
    };
  }
  onChange = (ev)=> {
    this.setState({ [ev.target.name] : ev.target.value });
  }
  render(){
    const { product, users } = this.props;
    const { managerId } = this.state;
    const { onChange } = this;
    const disabled = (this.props.product.managerId || '') === managerId;
    return (
      <div>
        <h6>{ product.name }</h6>
        <div className='form-group'>
        <label><em>Product Manager</em></label>
        <select name='managerId' className='form-control' value={ managerId } onChange={ onChange }>
          <option value=''>-- none --</option>
          {
            users.map( user => <option key={ user.id } value={ user.id}>{ user.name }</option>)

          }
        </select>
        </div>
        <button disabled={ disabled } onClick={ ()=> this.props.updateProductManager(product.id, managerId )} className='btn btn-primary'>Save</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users })=> {
  return {
    users
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    updateProductManager : (productId, managerId)=> dispatch(updateProductManager(productId, managerId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
