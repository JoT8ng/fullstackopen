const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  if (user) {
    response.json(users)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password || !name) {
    return response.status(401).json({
      error: 'missing username, password, or name'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(401).json({
      error: 'username and password must be more than 3 characters long'
    })
  }

  const existingUser = await User.findOne({
    where: {
      username: body.username
    }
  })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User.create({
    username,
    name,
    passwordHash,
  })

  response.status(201).json(savedUser)
})

usersRouter.get('/:id', async (req, res) => {
  const { read } = req.query

  const where = {}

  if (read !== undefined) {
    where.read = read === 'true'
  }

  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        as: 'readings',
          attributes: {
            exclude: ['userId'],
            include: ['year'],
          },
          through: {
            as: 'readinglists',
            attributes: ['read', 'id'],
            where: where,
          },
        attributes: { exclude: ['userId', 'disabled', 'admin'] }
      }
    })
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:username', async (req, res) => {
  const updatedUser = await User.findOne({ where: { username: req.params.username }})

  if (updatedUser) {
  try {
    await updatedUser.save()
    response.status(200).json(updatedUser)
  } catch (exception) {
    next(exception)
  }
  }
})

module.exports = usersRouter