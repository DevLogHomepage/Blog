import { Database, Key } from "lmdb";

//TODO: finsih this
export function updateNode(db:Database<any, Key>,value:any){
  if(db.get(value.internal.type)){

  }
}