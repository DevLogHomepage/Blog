import { parentPort } from "../nextql-worker";
import { NextQlNode } from "lib/prebuild/types";
import { open,RootDatabase,Key } from "lmdb";
import path from "path";

export interface NodeAction {
	db: RootDatabase<any, Key>
	createNode<T extends NextQlNode>(node:T):void
}

export function NodeAction(this:NodeAction):void{
	this.db = open({
		path: path.join(path.resolve("."),'.nextql','lmdb'),
		// any options go here, we can turn on compression like this:
		compression: true,
	});

}

NodeAction.prototype.createNode = async function<T extends NextQlNode>(node:T){
  parentPort?.postMessage(['CREATE_NODE',node])

}

