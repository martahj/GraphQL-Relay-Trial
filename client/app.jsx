import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
// import Pokemon from './components/pokemon';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('app props', this.props);
    this.state = {pokemonId: 1};
    this.changePokemon = this.changePokemon.bind(this);
  }

  changePokemon(newId) {
    this.setState(pokemonId, newId);
  }

  render() {
    return (
      <div className="bucket">
        World says hi
        <h1>Number: {this.state.pokemonId}</h1>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    id: this.state.pokemonId
  },
  fragments: {
    pokemon: () => Relay.QL`
    fragment on Pokemon() {
      id
      name
    }
    `,
  },
})
