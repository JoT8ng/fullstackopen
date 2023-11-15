const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, post) => {
    return sum + post.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(e => e.likes)
  const maxLikes = Math.max(...likes)

  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}