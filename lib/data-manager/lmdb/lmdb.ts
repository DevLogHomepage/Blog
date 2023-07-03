import { RootDatabase, open } from "lmdb"
import path from "path"
import { LmdbDatabases } from "../types"
import { NextQlNode } from "lib/prebuild/types"

let rootDB: RootDatabase | undefined
let dbPath: string
let database

declare global {
  var __NEXTQL_ROOTDATABASE: Map<string, RootDatabase>
  var __NEXTQL_DATABASE: Map<string, LmdbDatabases>
  namespace NodeJS {
    interface Global {
      __NEXTQL_DATABASE?: Map<string, LmdbDatabases>
      __NEXTQL_ROOTDATABASE?: Map<string, RootDatabase>
      testing:boolean
    }
  }
}

/**
 * get a root datadase
 * @returns 
 */
function getRoot(){
  if(!rootDB){

    if(!globalThis.__NEXTQL_ROOTDATABASE){
      globalThis.__NEXTQL_ROOTDATABASE = new Map();
    }
    rootDB = globalThis.__NEXTQL_ROOTDATABASE.get(dbPath)
    if(rootDB){
      return rootDB
    }
  }
  rootDB = open({
    name:"root",
    path: path.join(path.resolve("."),'.nextql','lmdb'),
    compression: true
  })
  globalThis.__NEXTQL_ROOTDATABASE.set(dbPath,rootDB)

  return rootDB
}

export function getDatabase():LmdbDatabases{
  if(!globalThis.__NEXTQL_DATABASE){
    globalThis.__NEXTQL_DATABASE = new Map()
  }

  database = globalThis.__NEXTQL_DATABASE.get(dbPath)
  if(database){
    return database
  }

  const rootDB = getRoot()
  database = {
    nodes: rootDB.openDB({
      name:'nodes', //this nodes should not be dupsort(duplicate supported)
    }),
    types: rootDB.openDB({
      name: 'types',
      dupSort:true,
    })
  } satisfies LmdbDatabases
  globalThis.__NEXTQL_DATABASE.set(dbPath,database)
  return database
}

/**
 * get a database of nodes that store data
 * 
 * @param id database node id
 * @returns 
 */
function getNode(id: string): NextQlNode | undefined {

  const { nodes } = getDatabase()
  return nodes.get(id)
}

function getTypes(type:string){
  const { types } = getDatabase()
  return types.get(type)
}