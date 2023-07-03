import { threadId, parentPort,workerData } from 'worker_threads';
import { getDataStore } from '../../data-manager';
console.log(workerData)

parentPort?.on("message",async ([type,value]) => {
  if(typeof type !== 'string') return
  switch(type){
    case 'CREATE_NODE':
    case 'ADD_SNODE':
      
      const db = await getDataStore()
      const storeID =  value.id + value.internal.sha
      // updateNode(db.nodes,value)
      // console.log(db)
      // await db?.put(`all${node.internal.type}`, []);
      // const getDBvalue = this.db.get(`all${node.internal.type}`)
      // getDBvalue.push(node)
      // await this.db.put(`all${node.internal.type}`,getDBvalue)
    break;
    case 'DELETE_NODE':
    case 'DROP_NODE':

    break;
  }

})