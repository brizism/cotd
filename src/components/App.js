import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  addFish = fish => {
    const fishes = { ...this.state.fishes } // makes copy of existing state
    fishes[`fish${Date.now()}`] = fish; // add new fish to fishes var
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh SeaFood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)} 
          </ul>
        </div>
        <Order /> 
        <Inventory 
          addFish={this.addFish} 
          loadSampleFishes={this.loadSampleFishes}
        /> 
      </div>
    )
  }
}

export default App;