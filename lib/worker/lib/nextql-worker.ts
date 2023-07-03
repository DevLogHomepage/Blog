import { Worker, WorkerOptions } from 'worker_threads';
export * from "worker_threads"
function nextqlWorker(path: string, options: WorkerOptions) {
  const resolvedPath = require.resolve(path);
	console.log(resolvedPath)
  return new Worker(resolvedPath, {
    ...options,
    execArgv: /\.ts$/.test(resolvedPath) ? ["--require", "ts-node/register"] : undefined,
  });
}

export { nextqlWorker }