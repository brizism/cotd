import React, { Component, Fragment } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  render(){
    return (
      <Fragment>
        <p>Fish!</p>
        <form className="store-selector">
          <h2>Please Enter a store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
          <button type="submit">Visit Store</button>
        </form> 
      </Fragment>
         
    ) 
  }
}

export default StorePicker; 