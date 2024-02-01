const Blog = require('./blogModel')
const User = require('./userModel')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Blog, User
}