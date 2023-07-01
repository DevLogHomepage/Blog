#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { loadEnvConfig }  from '@next/env'
import { Spinner, createSpinner } from 'nanospinner'

loadEnvConfig(process.cwd())

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
		const { default: defaultFunc }: { default: () => any } = await import(`./fetch/${file}`)
    const spinner = createSpinner(`Running pre-build script '${file}'`).start();
		try {
			const result = await defaultFunc()
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