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

app.get('/users', paginate(users), (req, res, next) => {
  res.json(req.paginateResults)
})
// Pagination using middleware
function paginate(model) {
  return (req, res, next) => {
    const results = {}
    const page = req.query.page
    const limit = req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    results.model = model.slice(startIndex, endIndex)
    if (startIndex > 0) results.prev = { page: page + 1, limit }
    if (endIndex < users.length) results.next = { page: page + 1, limit }
    req.paginateResults = results
    next()
  }
}
app.listen(5000, () => console.log('Server started'))
