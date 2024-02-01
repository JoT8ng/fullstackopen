const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { Sequelize, QueryTypes } = require('sequelize')
const { connectToDatabase } = require('./util/db')

const startServer = async () => {
  await connectDatabase()

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

startServer()