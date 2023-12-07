import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
      likes: 0,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title:
          <input
            type='text'
            value={blogTitle}
            name='title'
            id='title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
                    Author:
          <input
            type='text'
            value={blogAuthor}
            name='author'
            id='author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
                    URL:
          <input
            type='text'
            name='url'
            value={blogURL}
            id='url'
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm