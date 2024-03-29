const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const authorsRouter = require('./controllers/AuthorsRouter')
const adminRouter = require('./controllers/AdminRouter')
const readingRouter = require('./controllers/ReadinglistRouter')
const logoutRouter = require('./controllers/logoutRouter')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('./api/authors', authorsRouter)
app.use('./api/admin', adminRouter)
app.use('./api/readinglists', readingRouter)
app.use('./api/logout', logoutRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app