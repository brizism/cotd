import React from 'react';

class EditFishForm extends React.Component {
  handleChange = e => {
    // update that fish
    const updateFish = { 
      ...this.props.fish, // make copy of the current fish
      [e.currentTarget.name]: e.currentTarget.value // overwrite the one thing that changed using ES6 computed property names []
    };
    console.log(updateFish);
  }
  render() {
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
        <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
        <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
        <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />
      </div>
    )
  }
}


export default EditFishForm;