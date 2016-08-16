import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Pokemon from './components/pokemon';

class App extends Component {

  constructor(props) {
    super(props);
    this.setPokemon = this.setPokemon.bind(this);
  }

  setPokemon(id) {
    this.props.relay.setVariables({
      pokemonId: id
    })
  }

  render() {
    console.log('props', this.props);
    console.log('relay', this.props.relay);
    console.log('viewer props', this.props.viewer);
    console.log('viewer pokemon', this.props.viewer.pokemon);
    // window.setTimeout( () => {
    //   console.log('about to set timeout', this.setPokemon);
    //   this.setPokemon("1")
    // }, 2000);
    return (
      <div className="bucket">
        World says hi
        <h1>Number: {this.props.viewer.id}</h1>
        <Pokemon pokemon={this.props.viewer.pokemon}/>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    pokemonId: '2'
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        pokemon(id: $pokemonId) {
          id
          name
          ${Pokemon.getFragment('pokemon')}
        }
      }
    `
  }
})
