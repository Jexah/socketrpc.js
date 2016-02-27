# socketrpc.js
Simple tool to enable remote RPC from browser client to node.js server.

## Server

```
const port = 80;
const rpc = require('RPC')(port);

rpc('add', (number1, number2, resolve, reject) => {
  setTimeout(() => {
    resolve([number1, number2, number1 + number2]);
  }, 3000);
});

rpc('subtract', (number1, number2, resolve, reject) => {
  setTimeout(() => {
    resolve(number1 - number2);
  }, 3000);
});

rpc('multiply', (number1, number2, resolve, reject) => {
  setTimeout(() => {
    resolve({
      "Number1": number1,
      "Number2": number2,
      "Result": number1 * number2
    });
  }, 3000);
});

rpc('divide', (number1, number2, resolve, reject) => {
  setTimeout(() => {
    resolve(`${number1} divided by ${number2} equals ${number1 / number2}.`);
  }, 3000);
});
```

## Client

`<script src="./socketrpc.js"></script>`

```
const port = 80;
const rpc = RPC(80);

rpc('add', 1, 2).then(val => {
  console.log(val); // [1, 2, 3]: Array[3]
});

rpc('subtract', 1, 2).then(val => {
  console.log(val); // -1: Integer
});

rpc('multiply', 1, 2).then(val => {
  console.log(val); // {Number1: 1, Number2: 2, Result: 2}: Object
});

rpc('divide', 1, 2).then(val => {
  console.log(val); // "1 divided by 2 equals 0.5.": String
});
```