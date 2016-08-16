import React, { Component } from 'react';
import Relay from 'react-relay';
import Prevolutions from './prevolutions'
import Evolutions from './evolutions'

class Pokemon extends Component {

  constructor(props) {
    console.log('props in pokmeon constructor', props);
    super(props);
  }

  renderTypes(types) {
    let getType = (type) => <li>{type.name}</li>
    let weaknesses = types.map(type => type.weakAgainst)
                          .reduce( (allTypeWeakensses, current) => [...allTypeWeakensses, ...current], []);


    let strengths = types.map(type => type.strongAgainst)
                          .reduce( (allTypeStrengths, current) => [...allTypeStrengths, ...current], []);

    return (
      <div>
        <h5>Types:</h5>
        <ul>
          {types.map( type => getType(type) )}
        </ul>

        <h5>Weaknesses:</h5>
        <ul>
          {weaknesses.map( type => getType(type) )}
        </ul>

        <h5>Strengths:</h5>
        <ul>
          {strengths.map( type => getType(type) )}
        </ul>
      </div>
    )
  }

  render() {
    console.log('props of pokemon', this.props);
    let { pokemon } = this.props;
    console.log('pokemon', pokemon);
    return(
      <div className="pokemonDeets">
        <h2>Name: {pokemon.name} | Number: {pokemon.id}</h2>
        {this.renderTypes(pokemon.type)}
        <Prevolutions pokemon={this.props.pokemon}/>
        <Evolutions pokemon={this.props.pokemon}/>
      </div>
    )
  }
}
export default Relay.createContainer(Pokemon, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
        name
        type {
          name
          weakAgainst {
            name
          }
          strongAgainst {
            name
          }
        }
        ${Prevolutions.getFragment('pokemon')}
        ${Evolutions.getFragment('pokemon')}
      }
    `
  }
})
