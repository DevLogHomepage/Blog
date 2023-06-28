import { jsonToSchema } from "nextql_schema";
import fs from 'fs'
import path from 'path'
import { pruneSchema } from "@graphql-tools/utils";

const getPirority = () => 2

export { getPirority }


type SchemaText = {
  value:string
  error:undefined
}
export default async function execute(){
  // const text = fs.readFileSync(`${path.resolve(".")}/.nextql/graphql/data.json`,{encoding:'utf8',flag:'r'})
  // const json = JSON.parse(text)
  // let schemaText:string
  // if(Array.isArray(json))
  //   schemaText = jsonToSchema({baseType:'___tempNode',prefix:'',jsonInput:{node:json}}).value
  // else
  //   schemaText = jsonToSchema({baseType:'node',prefix:'',jsonInput:json}).value
  // fs.writeFileSync(`${path.resolve(".")}/.nextql/graphql/schema.graphql`,schemaText,{flag:'w'})
}