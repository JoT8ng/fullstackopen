const Blog = require('./blogModel')
const User = require('./userModel')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readinglists' })

module.exports = {
  Blog, User, Readinglist
}