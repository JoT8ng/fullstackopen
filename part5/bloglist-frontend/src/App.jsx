import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'
import Togglable from './components/togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage(`${username} has been successfully logged in`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(true)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(false)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService
        .create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage('Blog added successfully!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(true)
    } catch(exception) {
      console.error('Exception:', exception)
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(false)
    }
  }

  const updateLikes = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: blog.likes + 1
    }

    try {
      const returnedBlog = await blogService
        .update(id, updatedBlog)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      setErrorMessage('failed to update blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(false)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const removeBlog = async (id) => {
    try {
      if (window.confirm('Would you like to delete this blog?')) {

        await blogService
          .remove(id)

        setBlogs(blogs.filter(blog => blog.id !== id))

        setErrorMessage('Blog deleted successfully!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setMessage(true)
      }
    } catch (exception) {
      setErrorMessage('failed to delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setMessage(false)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification error={errorMessage} message={message} />

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
      {user !== null ?
        <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable> :
        null
      }

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} user={user} />
          )}
      </div>
    </div>
  )
}

export default App