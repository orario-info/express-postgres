const express = require('express')
const app = express()
const db = require('./queries')
const port = 3000


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getMemos)
// ex. /memos/2
app.get('/memos/:id', db.getMemoById)
app.post('/users', db.createMemo)
app.put('/users/:id', db.updateMemo)
app.delete('/users/:id', db.deleteMemo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})