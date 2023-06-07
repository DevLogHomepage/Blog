export { root }

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag/50052194#50052194

import { dirname } from 'path'                            // use dirname to get root 
import { fileURLToPath } from 'url'                       // use fileURLToPath to get root
const _dirname = dirname(fileURLToPath(import.meta.url))  // get _dirname because of default keyword `__dirname` is implemented so use `_dirname` instead
console.log(_dirname)
const root = `${_dirname}/`                               //exporting root directory
