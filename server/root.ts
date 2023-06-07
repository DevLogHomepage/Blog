export { root }

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag/50052194#50052194

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const _dirname = dirname(fileURLToPath(import.meta.url))
console.log(_dirname)
const root = `${_dirname}/`
