import { Database, Key } from "lmdb"
import { IDataStore } from "./types"

let database:any



export function getDataStore(){
  if(!database){
    const { getDatabase } = require('./lmdb/lmdb')
    database = getDatabase()
  }
  return database
}