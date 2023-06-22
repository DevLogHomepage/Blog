import { jsonToSchema } from "nextql_schema";
import fs from 'fs'
import path from 'path'

const getPirority = () => 2

export { getPirority }

export default async function execute(){
  const text = fs.readFileSync(`${path.resolve(".")}/.next/graphql/data.json`,{encoding:'utf8',flag:'r'})
  const json = JSON.parse(text)
  const {value,error} = jsonToSchema({baseType:'Post',prefix:'',jsonInput:json})
  fs.writeFileSync(`${path.resolve(".")}/.next/graphql/schema.graphql`,value,{flag:'w'})
}