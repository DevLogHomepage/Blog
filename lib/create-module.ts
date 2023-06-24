import { 
  printSchema,
  GraphQLObjectType,
  GraphQLSchema, 
  GraphQLString, 
  lexicographicSortSchema, 
  GraphQLList, 
  GraphQLInt 
} from "graphql";

import {} from "../nextql-node"

const Node = new GraphQLObjectType({
  name:"node",
  fields:{
    children: {type: new GraphQLList(GraphQLString)},
    content: {type: GraphQLString}
  }
})

const SchemaEdges = new GraphQLObjectType({
  name: "edges",
  fields:{
    previous: {type: Node},
    node: {type: Node},
    next: {type: Node}
  }
})

function createModule(typeName:string){
  return new GraphQLObjectType({
    name: `all${typeName}`,
    fields:{
      edges: {type: SchemaEdges},
      nodes: {type: new GraphQLList(Node)},
      totalCount: {type: GraphQLInt},
    }
  })
}

function testing(){
  const MyAppSchema = new GraphQLSchema({
    query: createModule("Book")
  })
  
  const testing = lexicographicSortSchema(MyAppSchema)
  console.log(printSchema(testing))
  
}
