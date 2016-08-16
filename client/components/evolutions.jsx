import React, { Component } from 'react';
import Relay from 'react-relay';
import PokemonCard from './pokemonCard'

class Evolutions extends Component {

  constructor(props) {
    super(props);
  }

  renderNext() {
    let evolutions = this.props.pokemon.evolvesInto;
    if (evolutions && evolutions.length) {

      return (
        <ul>
        {evolutions.map( evolution => <PokemonCard pokemon={evolution} />)}
        </ul>
      )
    } else {
      return <ul><li>n/a</li></ul>
    }
  }

  render() {
    console.log('props in Prevolutions', this.props.pokemon);
    return(
      <div>
        <h5>Evolves Into:</h5>
        {this.renderNext()}
      </div>
    )
  }

}
export default Relay.createContainer(Evolutions, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        evolvesInto {
          ${PokemonCard.getFragment('pokemon')}
        }
      }
    `
  }
})
