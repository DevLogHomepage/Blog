import path from "path"
import { IScriptParams } from "prebuild"
import fs from 'fs'

const getPirority = () => 0

export { getPirority }

export default async function execute(params: IScriptParams){

  const nextFile = fs.readdirSync(`${path.resolve(".")}`)
  if(nextFile.find((file) => file !== ".nextql")){
    try{
      fs.mkdirSync(`${path.resolve(".")}/.nextql`)
    }
    catch(e){
    }
  }
}