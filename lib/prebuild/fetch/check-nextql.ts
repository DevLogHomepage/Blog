import path from "path"
import fs from 'fs'
import { NodeAction } from "lib/actions"

const getPirority = () => 0

export { getPirority }

export default async function execute(params: NodeAction){

  const nextFile = fs.readdirSync(`${path.resolve(".")}`)
  if(nextFile.find((file) => file !== ".nextql")){
    try{
      fs.mkdirSync(`${path.resolve(".")}/.nextql`)
    }
    catch(e){
    }
  }

}