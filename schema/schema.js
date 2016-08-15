import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import helpers from './schemaHelpers.js';

/*

  interface Pokemon {
    id: Integer!   //the ! at the end indicates the field is non-nullable
    name: String!
    type: [Element]
  }

  type Basic : Pokemon {
    id: Integer!
    name: String!
    type: [Element]
    family: [Pokemon]
  }

  type Evolved : Pokemon {
    id: Integer!
    name: String!
    type: [Element]
    evolvesFrom: String!
    evolvesInto: String   //this field is nullable because some Pokemon are final evolutions
  }

  type Element {
    id: Integer!
    name: String!
    weakAgainst: [Element]
    strongAgainst: [Element]
  }

  type Query {
    pokemon (id: Integer!): Pokemon
    element (id: Integer!): Element
    previousEvolution (id: Integer!): Pokemon
    nextEvolution (id: Integer!): [Pokemon] //this is an array to deal with special case Eevee
  }

 */

const pokemonInterface = new GraphQLInterfaceType({
  name: 'Pokemon',
  description: 'A pocket monster',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    }
  })
});

const basicPokemonType = new GraphQLObjectType({
  name: 'BasicPokemon',
  description: 'A pokemon, as it exists at the beginning of its life',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    },
    family: {
      type: new GraphQLList(pokemonInterface),
      description: 'All pokemon that this pokemon could one day become'
    }
  })
});

const evolvedPokemonType = new GraphQLObjectType({
  name: 'EvolvedPokemon',
  description: 'A pokemon that was once a different pokemon',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    },
    evolvesFrom: {
      type: new GraphQLNonNull(pokemonInterface),
      description: 'The immediately prior pokemon in the evolution chain'
    },
    evolvesInto: {
      type: evolvedPokemonType,
      description: 'The next pokemon in the evolution chain, if one exists'
    }
  })
});

const elementType = new GraphQLObjectType({
  name: 'Element',
  description: 'Element attribute of a pokemon',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Id of the element'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'What the element is called'
    },
    weakAgainst: {
      type: new GraphQLList(elementType),
      description: 'Attack types that will be super effective against pokemon of this type'
    },
    strongAgainst: {
      type: new GraphQLList(elementType),
      description: 'Pokemon types that attacks of this element will be super effective against'
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => {
        console.log('in count resolve function');
        return 150;
      }
    },
    pokemon: {
      type: pokemonInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'id of the pokemon'
        }
      },
      resolve: (root, { id }) => helpers.getPokemon(id)
    },
    element: {
      type: elementType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'id of the element'
        }
      },
      resolve: (root, { id }) => helpers.getElement(id)
    },
    previousEvolution: {
      type: pokemonInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'id of the pokemon'
        }
      },
      resolve: (root, { id }) => helpers.getPreviousEvolution(id)
    },
    nextEvolution: {
      type: new GraphQLList(pokemonInterface),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'id of the pokemon'
        }
      },
      resolve: (root, { id }) => helpers.getNextEvolution(id)
    }
  })
})

export default new GraphQLSchema({
  query: queryType,
  types: [basicPokemonType, evolvedPokemonType, elementType]
})
