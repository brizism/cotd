import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  // Everytime we load the page, firebase will see if we are logged in - if true, passes the user
  // and that user is passed to authHandler which in turn is going to do all of the checks
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this});
    console.log(store);
    // claim it if there is no owner
    if(!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.useer.uid
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }

  render(){
    const logout = <button onClick={this.logout}>Log Out!</button>

    // Check if they are logged in 
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }

    // Check if they are not the owner of the store
    if(this.state.uid !== this.state.owner) {
      return 
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
    }

    // They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => 
          <EditFishForm 
            key={key} 
            index={key}
            fish={this.props.fishes[key]} 
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        )}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;