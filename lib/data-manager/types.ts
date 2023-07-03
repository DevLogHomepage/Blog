import { NextQlNode } from "lib/prebuild/types"
import { Database } from "lmdb"

export type NextQLNodeID = string
export type NextQLNodeType = string

export type LmdbDatabases = {
  nodes:Database<NextQlNode, NextQLNodeID>
  types:Database<NextQLNodeType, NextQLNodeID>
}

export interface IDataStore {
  // getNode(id: string): IGatsbyNode | undefined
  // getTypes(): Array<string>
  // countNodes(typeName?: string): number
  // ready(): Promise<void>
  // iterateNodes(): GatsbyIterable<IGatsbyNode>
  // iterateNodesByType(type: string): GatsbyIterable<IGatsbyNode>
  // runQuery(args: IRunQueryArgs): Promise<IQueryResult>

}