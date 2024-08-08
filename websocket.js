// websocket/index.js
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 })

console.log(wss)

// 暫存訊息放置處
const messages = []

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    // 由於 data 是 Buffer，所以要使用 toString 轉成字串
    messages.push(data.toString())

    // 將所有連線的 client 傳送訊息
    wss.clients.forEach((client) => {
      // 由於 messages 往前端傳送時，會是 Blob，所以要先轉成字串
      client.send(JSON.stringify(messages) || [])
    })
  })

  // 當連線時，將所有訊息傳送給連線的 client，所以算是初始化訊息
  ws.send(JSON.stringify(messages) || [])
})
