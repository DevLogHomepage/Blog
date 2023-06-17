//graphql.note.ts -> 데이터를 받아옴
    // export node


//node -> schema.graphql
// try to look https://github.dev/gatsbyjs/gatsby -> sort-and-filter(isIntInput)

import { printSchema,GraphQLObjectType,GraphQLSchema, GraphQLString, lexicographicSortSchema, GraphQLFloat, GraphQLList, GraphQLType } from "graphql";
import { join } from "path";
import fs from "fs";
console.log("testing")

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:{
    title: {type: GraphQLString},
    author: {type: GraphQLString},
  } 
})

const allBookType = new GraphQLObjectType({
  name: `allBook`,
  fields:{
    node: {type: new GraphQLList(BookType)}
  } 
})


const FloatQueryOperatorInput= new GraphQLObjectType({
  name: 'FloatQueryOperatorInput',
  fields:{
    eq: {type: GraphQLFloat},
    gt: {type: GraphQLFloat},
    gte: {type: GraphQLFloat},
    in: {type: new GraphQLList(GraphQLFloat)},
    lt: {type: GraphQLFloat},
    lte: {type: GraphQLFloat},
    ne: {type: GraphQLFloat},
    nin: {type: new GraphQLList(GraphQLFloat)},
  }
})

const MyAppSchema = new GraphQLSchema({
  query: allBookType
})

const testing = lexicographicSortSchema(MyAppSchema)
console.log(printSchema(testing))

async function pass() {
  try {
    const schemaSDLString = printSchema(lexicographicSortSchema(MyAppSchema))
  
    // await fs.outputFile("./", schemaSDLString)
    fs.writeFileSync(".next/grpahql/schema.graphql",schemaSDLString)
    // reporter.verbose(`Successfully created schema.graphql`)
  } catch (err) {
    // reporter.error(`Failed to write schema.graphql to .cache`, err)
  }
}

pass()

/**
 * [이름]
 *    filter: // 특정 필드를 기준으로 데이터 필터
 *    sort: // 특정 필드로 정렬
 *    limit: // 가지고 오는 개수 제한
 *    skip: // 특정 개수 제외
 *    distinct: // 모든 필트 중복 제거( 한꺼번에 합쳐서 표현함)
 *    edges:
 *      node:
 *        children ( 필수 )
 *        content ( 필수 )
 *        [ 사용자 정의 ]
 *      next:
 *        [ 사용자 정의 ]
 *      previous:
 *        [ 사용자 정의]
 *    nodes:
 *      [ 사용자 정의]
 *    group:
 *    totalCount:
 *    sum
 */