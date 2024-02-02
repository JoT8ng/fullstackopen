const readingRouter = require('express').Router()
const config = require('../utils/config')
const Blog = require('../models/models')
const Readinglist = require('../models/readinglist')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

readingRouter.get('/', async (request, response, next) => {
  try {
    const readinglists = await Readinglist.findAll({})
    console.log(JSON.stringify(readinglists, null))
    response.json(readinglists)
  } catch (exception) {
    next(exception)
  }
})

readingRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = Blog.findByPk(request.body.blog_id)

  if (!blog) {
    return response.status(400).json({
      error: 'Error blog does not exist'
    })
  }

  try {
    const newReadinglist = await Readinglist.create({
      title: body.title,
      blogId: body.blog_id,
      userId: body.userId
    })
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

readingRouter.put('/:id', async (request, response, next) => {
  try {
    const readinglist = await Readinglist.findByPk(request.params.id)

    if (readinglist === null) {
      return next('reading list could not be found')
    }

    if (readinglist.userId !== request.user.id) {
      return response.status(400).json({ error: 'user has no permission to update readinglist' })
    }

    await readinglist.save()

    response.status(200).json(readinglist)
  } catch (exception) {
    next(exception)
  }
})

module.exports = readingRouter