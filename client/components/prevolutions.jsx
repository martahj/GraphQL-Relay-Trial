import React, { Component } from 'react';
import Relay from 'react-relay';
import PokemonCard from './pokemonCard'

class Prevolutions extends Component {

  constructor(props) {
    super(props);
  }

  renderPrevious() {
    if (this.props.pokemon.evolvesFrom) {
      return (
        <PokemonCard pokemon={this.props.pokemon.evolvesFrom} />
      )
    } else {
      return <li>n/a</li>
    }
  }

  render() {
    console.log('props in Prevolutions', this.props.pokemon);
    return(
      <div>
        <h5>Evolved From:</h5>
        <ul>
          {this.renderPrevious()}
        </ul>
      </div>
    )
  }

}
export default Relay.createContainer(Prevolutions, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        evolvesFrom {
          ${PokemonCard.getFragment('pokemon')}
        }
      }
    `
  }
})
