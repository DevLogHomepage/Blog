import path from "path"
import { NodeAction } from "lib/actions"
import fs from 'fs'
import { nextqlWorker,Worker } from "lib/nextql-worker"

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
  const dbWorker = nextqlWorker(path.join(path.resolve("."),'/lib/data-manager/lmdb-worker.ts'), {})
  const worker = nextqlWorker(path.join(path.resolve("."),'/lib/nextqlNode-worker.ts'), {})
  worker.on("message",([type,value]) => {
    dbWorker.postMessage([type,value])
    // console.log(value)
  })
}

