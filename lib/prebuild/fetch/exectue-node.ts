import path from "path"
import { NodeAction } from "../index"
import fs from 'fs'

const getPirority = () => 1

export { getPirority }

// const userNode = {
//   id: `${i}`,
//   parent: `__SOURCE__`,
//   internal: {
//     type: `Post`, // name of the graphQL query --> allPost {}
//     contentDigest:''
//   },
//   children: [],
//   title:metaJson.title,
//   content:content,
//   tags:metaJson.tags,
//   dates:dates
// }


export default async function execute(actions:NodeAction){
  const nextFile = fs.readdirSync(`${path.resolve(".")}/.nextql`)
  if(!nextFile.find((file) => file === "graphql")){
    try{
      fs.mkdirSync(`${path.resolve(".")}/.nextql/graphql`,{recursive:true})
    }
    catch(e){
    }
  }
  const testing: { [key:string]: (_:NodeAction) => void } = await import(path.join(path.resolve("."),"./nextql-node.ts"))

  // console.log()
  // console.log()
  console.log(testing)
  for await (const [key,exeFunc] of Object.entries(testing)){
    console.log(key)
    try{
      await exeFunc(actions)
      // createNode(result)
      
      // fs.writeFileSync(`${path.resolve(".")}/.nextql/graphql/data.json`,JSON.stringify(result),{flag:'w'})
    }
    catch(e){
      throw new Error(`Error in ${key} function: ${e}`)
    }
  }
  
}

