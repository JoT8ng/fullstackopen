const blogsRouter = require('express').Router()
const config = require('../utils/config')
const Blog = require('../models/models')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sequelize = require('./index')
const { Sequelize, QueryTypes } = require('sequelize')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
  try {
    const where = {}

    if (request.query.search) {
      where[Op.or] = [
        {
          title: {
            [Op.substring]: request.query.search
          }
        },
        {
          author: {
            [Op.substring]: request.query.search
          }
        },
      ]
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where,
      order: [
        ['likes', 'DESC']
      ]
    })
    console.log(JSON.stringify(blogs, null))
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogToDelete = await Blog.findByPk(request.params.id)

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findByPk(decodedToken.id)

  if (blogToDelete.userId.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: 'only users who wrote blog entry can delete entry'
    })
  }
  
  try {
    await blogToDelete.destroy()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (!body.likes) {
    body.likes = 0
  }

  try {
    const savedBlog = await Blog.create({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      userId: user.id
    })
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    await Blog.update(updatedBlog, {
      where: {
        id: blog.id
      }
    }),
    response.status(200).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter