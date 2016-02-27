// All requires
const websocket = require('nodejs-websocket');

// Record that stores all of the generated hooks
const wsHooks = {};

// Initialize the websocket server on port, return the function to register procedures.
exports = (port, debug) => {
  websocket.createServer().listen(port).on('connection', (ws) => {
    ws.on('text', (data) => {
      const obj = JSON.parse(data);
      if(Object.keys(wsHooks).indexOf(obj.procedureName) != -1){
        new Promise((resolve, reject) => { 
          wsHooks[obj.procedureName](...obj.args, resolve, reject);
        }).then(val => {
          ws.sendText(JSON.stringify({uid: obj.uid, val: val}));
        });
      }else{
        if(debug) console.log(`Procedure ${obj.procedureName} not found.`);
      }
    });
  });
  return registerProcedure;
}

// Hook procedure
function registerProcedure(procedureName, procedureBody){
  wsHooks[procedureName] = procedureBody;
}