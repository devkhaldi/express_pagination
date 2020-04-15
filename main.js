const express = require('express')
const app = express()

const users = [
  { id: 1, name: 'User 1', age: 20 },
  { id: 2, name: 'User 2', age: 20 },
  { id: 3, name: 'User 3', age: 20 },
  { id: 4, name: 'User 4', age: 20 },
  { id: 5, name: 'User 5', age: 20 },
  { id: 6, name: 'User 6', age: 20 },
  { id: 7, name: 'User 7', age: 20 },
  { id: 8, name: 'User 8', age: 20 },
  { id: 9, name: 'User 9', age: 20 },
]
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const results = {}
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  results.users = users.slice(startIndex, endIndex)
  if (startIndex > 0) results.prev = { page: page - 1, limit }
  if (endIndex < users.length) results.next = { page: page + 1, limit }
  res.json(results)
})

app.listen(5000, () => console.log('Server started'))
