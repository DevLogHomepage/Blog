import path from "path"
import { IScriptParams } from "prebuild"
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


export default async function execute(){
  const nextFile = fs.readdirSync(`${path.resolve(".")}/.nextql`)
  if(!nextFile.find((file) => file === "graphql")){
    try{
      fs.mkdirSync(`${path.resolve(".")}/.nextql/graphql`,{recursive:true})
    }
    catch(e){
    }
  }

  const testing: { [key:string]: () => any } = await import(path.join(path.resolve("."),"./nextql-node.ts"))
  // console.log()
  for await (const [key,exeFunc] of Object.entries(testing)){
    try{
      const result = await exeFunc()
      fs.writeFileSync(`${path.resolve(".")}/.nextql/graphql/data.json`,JSON.stringify(result),{flag:'w'})
    }
    catch(e){
      throw new Error(`Error in ${key} function: ${e}`)
    }
  }
  // Promise.all(Object.entries(testing).forEach(async ([key,exeFunc]) => {
  //   await createNode(exeFunc())
  // }))
  
}

