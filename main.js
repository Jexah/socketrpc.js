// All requires
const websocket = require('nodejs-websocket');

// Record that stores all of the generated hooks
const wsHooks = {};

// Initialize the websocket server on port, return the function to register procedures.
module.exports = (io, debug) => {
  io.on('connection', socket => {
    if(debug) console.log(`Socket connected.`);
    socket.on('rpc', obj => {
      if(Object.keys(wsHooks).indexOf(obj.procedureName) != -1){
        new Promise((resolve, reject) => { 
          wsHooks[obj.procedureName](...obj.args, resolve, reject);
        }).then(val => {
          socket.emit('rpc', {uid: obj.uid, val: val});
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