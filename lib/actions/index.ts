import { parentPort } from "../worker/lib/nextql-worker";
import { NextQlNode } from "lib/prebuild/types";
import { open,RootDatabase,Key } from "lmdb";
import path from "path";
import {SHA256} from 'crypto-js'

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
	node.internal.sha = SHA256(JSON.stringify(node)).toString() // to discrimination same id of node
  parentPort?.postMessage(['CREATE_NODE',node])
}

