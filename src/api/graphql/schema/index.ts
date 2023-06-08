import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Book',
    fields: {
      title: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
      author: {
        type: GraphQLString,
        resolve() {
          return 'hello';
        },
      },
    },
  }),
});
export {schema}