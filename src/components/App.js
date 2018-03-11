import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount(){
    // here we are mirroring our state over to what is our firebase
    const { params } = this.props.match; // destructure props from router

    const localStorageRef = localStorage.getItem(params.storeId);  // First reinstate our localStorage
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    
    // below we sync it not to the entire db but the name of the store
    this.ref = base.syncState(`${params.storeId}/fishes`, {   // this.ref in Firebase is a reference to a piece of data in the db
      context: this,
      state: 'fishes'
    });
  }
  
  componentDidUpdate(){
    localStorage.setItem(
      this.props.match.params.storeId, 
      JSON.stringify(this.state.order));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref); // unlisten to changes
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes } // makes copy of existing state
    fishes[`fish${Date.now()}`] = fish; // add new fish to fishes var
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;  // set to null so it gets delete it from firebase
    this.setState({ fishes });  // update state
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order } // make copy of state
    order[key] = order[key] + 1 || 1; // either add to the order, or update the # in our order
    this.setState({ order }) 
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order } 
    delete order[key]; // here we aren't mirroring to fb so we use delete 
    this.setState({ order }) 
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh SeaFood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key} // passing down key again as our own prop
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder} 
              />
            ))} 
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          removeFromOrder={this.removeFromOrder}
        /> 
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}  // storeId comes from react-router
        /> 
      </div>
    )
  }
}

export default App;