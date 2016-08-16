import React, { Component } from 'react';
import Relay from 'react-relay';

class Pokemon extends Component {

  constructor(props) {
    console.log('props in pokmeon constructor', props);
    super(props);
  }

  render() {
    console.log('props of pokemon', this.props);
    return(
      <div className="pokecard">
      <p>Child rendering</p>
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
      }
    `
  }
})
