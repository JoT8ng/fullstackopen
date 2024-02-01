require('dotenv').config({ path: '.env.local' })

const PORT = process.env.PORT
const POSTGRES_URL = process.env.POSTGRES_URL

const SECRET = process.env.SECRET

module.exports = {
  POSTGRES_URL,
  PORT,
  SECRET
}