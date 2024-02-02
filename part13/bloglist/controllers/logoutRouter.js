const logoutRouter = require('express').Router()
const { tokenValidator } = require('../utils/middleware')
const Session = require('../models/session')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

logoutRouter.delete('/', tokenValidator, async (req, res) => {
    try {
      const token = getTokenFrom(req)

      await Session.destroy({
        where: { token: token },
      })
      res.status(204).end()
    } catch (exception) {
      next(exception)
    }  
})

module.exports = logoutRouter