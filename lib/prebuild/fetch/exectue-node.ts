import path from "path"
import { NodeAction } from "lib/actions"
import fs from 'fs'
import { nextqlWorker,Worker } from "@lib/worker/lib/nextql-worker"

const getPirority = () => 1

export { getPirority }


/**
 * 
 * @param actions 
 * @example
 * const userNode = {
    id: `${i}`,
    parent: `__SOURCE__`,
    internal: {
      type: `Post`, // name of the graphQL query --> allPost {}
      contentDigest:''
    },
    children: [],
    title:metaJson.title,
    content:content,
    tags:metaJson.tags,
    dates:dates
  }
 */

export default async function execute(actions:NodeAction){
  const nextFile = fs.readdirSync(`${path.resolve(".")}/.nextql`)
  if(!nextFile.find((file) => file === "graphql")){
    try{
      fs.mkdirSync(`${path.resolve(".")}/.nextql/graphql`,{recursive:true})
    }
    catch(e){
    }
  }
  const dbWorker = nextqlWorker(path.join(path.resolve("."),'/lib/worker/worker-module/lmdb-worker.ts'), {})
  const worker = nextqlWorker(path.join(path.resolve("."),'/lib/worker/worker-module/nextqlNode-worker.ts'), {})
  worker.on("message",([type,value]) => {
    dbWorker.postMessage([type,value])
    // console.log(value)
  })

  worker.on('exit',() => {
    console.log('nextqlNode-worker exit')
  })

  dbWorker.on('exit',()=> {
    console.log('lmdb-worker exit')
  })
}

