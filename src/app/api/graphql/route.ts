import { loadFilesSync } from "@graphql-tools/load-files"
import { createSchema, createYoga } from "graphql-yoga"
import path from "path"
import resolver from './resolvers'
// typeDefs:loadFilesSync(path.join(path.resolve("."),'./.nextql/graphql/schema.graphql')),
// resolvers:loadFilesSync(path.join"./resolvers.ts")


//https://stackoverflow.com/questions/58632673/how-to-dynamically-reuse-resolvers-in-apollo check to make this work
const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs:loadFilesSync(path.join(path.resolve("."),'./.nextql/graphql/schema.graphql')),
    resolvers: resolver
  }),
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST }