const authorsRouter = require('express').Router()
const Blog = require('../models/models')
const sequelize = require('./index')
const { Sequelize, QueryTypes } = require('sequelize')

authorsRouter.get('/authors', async (request, response, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        'author'
      ],
      group: ['author'],
      order: [
        [sequelize.col('likes'), 'DESC']
      ]
    })
    console.log(JSON.stringify(authors, null))
    response.json(authors)
  } catch (exception) {
    next(exception)
  }
})

module.exports = authorsRouter