const RPC = (port => {
  const wsHooks = {};

  const ws = new WebSocket(`ws://${window.location.hostname}:${port}`);

  function sendRequest(procedureName, ...args){
    return new Promise((resolve, reject) => {
      const uid = Math.random().toString();
      wsHooks[uid] = resolve;
      ws.send(JSON.stringify({procedureName: procedureName, args: args, uid: uid}));
    });
  }

  ws.onmessage = (evt) =>
  {
    const obj = JSON.parse(evt.data);
    if(Object.keys(wsHooks).indexOf(obj.uid) != -1){
      wsHooks[obj.uid](obj.val);
      delete wsHooks[obj.uid];
    }
  }

  return sendRequest;
});