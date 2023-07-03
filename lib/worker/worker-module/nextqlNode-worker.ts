import path from 'path'
import { Worker,workerData } from 'worker_threads'
import { NodeAction } from "../../actions"

var nodeAction = new (NodeAction as any)();
async function runAsync(){
  const importNode: { [key:string]: (_:NodeAction) => void } = await import(path.join(path.resolve("."),"./nextql-node.ts"))

  Object.entries(importNode).forEach(([key,value]) => {
    value(nodeAction)
  })

}

;(async () => {
  await runAsync()
})().catch(err => {
	console.error(err)
	throw err
})