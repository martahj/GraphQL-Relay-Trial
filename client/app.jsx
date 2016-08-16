import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
// import Pokemon from './components/pokemon';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props, this.props.pokemon);
    return (
      <div className="bucket">
        World says hi
        <h1>Number: {this.props.pokemon.name}</h1>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
        name
      }
    `
  }
})
