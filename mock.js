const express = require('express')
const app = express()

app.get('/api/course/list', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    list: [
      {name: '张三', id: 1},
      {name: '李四', id: 2},
      {name: '王五', id: 3},
      {name: '赵六', id: 4}
    ]
  })
})

app.get('/api/user/info', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    data: {
      name: '张三丰'
    }
  })
})
app.listen(9090, ()=>{
  console.log('9090 is runnning')
})