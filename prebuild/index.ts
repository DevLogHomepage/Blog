#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import pkg from '@next/env'
import { Spinner, createSpinner } from 'nanospinner'

const { loadEnvConfig } = pkg

export interface IScriptParams {
	env: any
}

loadEnvConfig(process.cwd())

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms))

const runAsync = async () => {
	// find all scripts in subfolder
	const files = fs
		.readdirSync(path.join(path.resolve(), 'prebuild/fetch'))
		.filter(file => file.endsWith('.ts'))
		.sort()
	for (const file of files) {
		const { default: defaultFunc }: { default: (params: IScriptParams) => void } = await import(`./fetch/${file}`)
    const spinner = createSpinner(`Running pre-build script '${file}'`).start();
		try {
			// console.log(`Running pre-build script '${file}'`)
			const result = await defaultFunc({ env: process.env })
      spinner.success({text:`success running ${file}`})
      console.log(result)
		} catch (e) {
			// console.error()
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






// Todo: just change to https://kontent.ai/blog/how-to-run-scripts-before-every-build-on-next-js this method instead and use cli erase to make nicer
// export default start()

// start()

// https://nodejs.org/api/cli.html

// https://betterprogramming.pub/how-to-run-typescript-in-javascript-1545e8a36518

// https://kontent.ai/blog/how-to-run-scripts-before-every-build-on-next-js

// https://github.com/gatsbyjs/gatsby/blob/fd4d702bf3e969bed1289e62106314be9fd41345/package.json#L104 // TODO: check npm-run-all 