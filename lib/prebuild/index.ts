#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { loadEnvConfig }  from '@next/env'
import { Spinner, createSpinner } from 'nanospinner'
import lmdb, { open } from 'lmdb'; // or require
import { NextQlNode } from './types';



export interface NodeAction {
	db: lmdb.RootDatabase<any, lmdb.Key>
	createNode<T extends NextQlNode>(node:T):void
}

function NodeAction(this:NodeAction):void{
	this.db = open({
		path: path.join(path.resolve("."),'.nextql','lmdb'),
		// any options go here, we can turn on compression like this:
		compression: true,
	});

}

NodeAction.prototype.createNode = async function<T extends NextQlNode>(node:T){
	await this.db.put(`all${node.internal.type}`, []);
  const getDBvalue = this.db.get(`all${node.internal.type}`)
	getDBvalue.push(node)
	await this.db.put(`all${node.internal.type}`,getDBvalue)
}




loadEnvConfig(process.cwd())
var nodeAction = new (NodeAction as any)();

// const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms))

const runAsync = async () => {
	// find all scripts in subfolder
	const files = fs
		.readdirSync(path.join(path.resolve(), './lib/prebuild/fetch'))
		.filter(file => file.endsWith('.ts'))

	files.sort((a,b) => {
		const aPriority = require(`./fetch/${a}`).getPirority()
		const bPriority = require(`./fetch/${b}`).getPirority()
		return aPriority - bPriority
	})

	for (const file of files) {
		const { default: defaultFunc }: { default: (params: NodeAction) => any } = await import(`./fetch/${file}`)
    const spinner = createSpinner(`Running pre-build script '${file}'`).start();
		try {
			const result = await defaultFunc(nodeAction)
      spinner.success({text:`success running ${file}`})
			if(result){
				console.log(result)
			}
		} catch (e) {
      spinner!.error({text:`SCRIPT RUNNER: failed to execute pre-build script '${file}'`})
			console.error(e)
		}
	}
}

// Self-invocation async function
;(async () => {
	await runAsync()
})().catch(err => {
	console.error(err)
	throw err
})

// https://github.com/gatsbyjs/gatsby/blob/fd4d702bf3e969bed1289e62106314be9fd41345/package.json#L104 // TODO: check npm-run-all 