import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const { blog, updateLikes, removeBlog } = props
  const [visible, setVisible] = useState(false)
  const showVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle} className='blog'>
      <div>
        <p id='blog-title-author'>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </p>
      </div>
      <div style={showVisible}>
        <p id='blog-url'>{blog.url}</p>
        <p id='blog-likes'>
          {blog.likes}
          <button onClick={() => updateLikes(blog.id)}>like</button>
        </p>
        <button onClick={() => removeBlog(blog.id)}>Delete</button>
      </div>
    </div>
  )}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}