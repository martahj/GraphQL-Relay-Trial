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

 const pokemonType = new GraphQLObjectType({
   name: 'Pokemon',
   description: 'A pocket monster',
   fields: () => ({
     id: {
       type: new GraphQLNonNull(GraphQLString),
       description: 'The numberical id assigned to a Pokemon'
     },
     name: {
       type: new GraphQLNonNull(GraphQLString),
       description: 'The only word a pokemon can say'
     },
     type: {
       type: new GraphQLList(elementType),
       description: 'The element(s) the pokemon has special abilities related to',
       resolve: pokemon => pokemon.type.map( id => helpers.getElement(id) )
     },
     evolvesFrom: {
       type: pokemonType,
       description: 'The pokemon that evolved into the current one, if any',
       resolve: pokemon => helpers.getPokemon(pokemon.evolvesFrom)
     },
     evolvesInto: {
       type: new GraphQLList(pokemonType),
       description: 'The next pokemon in the evolution chain',
       resolve: pokemon => pokemon.evolvesInto.map( id => helpers.getPokemon(id) )
     }
   })
 })

const elementType = new GraphQLObjectType({
  name: 'Element',
  description: 'Element attribute of a pokemon',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the element'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'What the element is called'
    },
    weakAgainst: {
      type: new GraphQLList(elementType),
      description: 'Attack types that will be super effective against pokemon of this type',
      resolve: element => element.weakAgainst.map( id => helpers.getElement(id) )
    },
    strongAgainst: {
      type: new GraphQLList(elementType),
      description: 'Pokemon types that attacks of this element will be super effective against',
      resolve: element => element.strongAgainst.map( id => helpers.getElement(id) )
    }
  })
});

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'A user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the person'
    },
    pokemon: {
      type: pokemonType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (person, otherArgs ) => {
        let pokemonId = otherArgs.id;
        return helpers.getPokemon(pokemonId);
      }
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    count: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => 150
    },
    viewer: {
      type: viewerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'id of the pokemon'
        }
      },
      resolve: (root, { id }) => helpers.getPerson(id)
    },
    pokemon: {
      type: pokemonType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'id of the pokemon'
        }
      },
      resolve: (root, { id }) => helpers.getPokemon(id)
    },
    element: {
      type: elementType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'id of the element'
        }
      },
      resolve: (root, { id }) => helpers.getElement(id)
    }
  })
})

export default new GraphQLSchema({
  query: queryType,
  types: [pokemonType, elementType, viewerType]
})
