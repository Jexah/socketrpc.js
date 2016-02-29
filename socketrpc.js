const RPC = (() => {

  const wsHooks = {};

  const socket = io();

  function sendRequest(procedureName, ...args){
    return new Promise((resolve, reject) => {
      const uid = Math.random().toString();
      wsHooks[uid] = resolve;
      socket.emit('rpc', {procedureName: procedureName, args: args, uid: uid});
    });
  }

  socket.on('rpc', (obj) => {
    if(Object.keys(wsHooks).indexOf(obj.uid) != -1){
      wsHooks[obj.uid](obj.val);
      delete wsHooks[obj.uid];
    }
  });

  return sendRequest;
});