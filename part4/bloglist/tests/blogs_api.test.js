const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/models')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe(('blogs are received'), () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    }, 100000)
      
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('blog posts have id', async ()  => {
        const response = await api.get('/api/blogs')
        const content = response.body.map(r => r)
        expect(content[0].id).toBeDefined()
    })
})

describe(('blogs are added'), () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Jo',
            url: 'https://testblog.com/',
            likes: 3,
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
          'Test blog'
        )
    })

    test('blog without content is not added', async () => {
        const newBlog = {
            author: 'Jo'
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('if blog is posted without likes, likes defaults to 0', async () => {
        const newBlog = {
            title: 'No Likes Test',
            author: 'Jo',
            url: 'https://nolikestest.com/',
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
      
        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(n => n)
        const recentBlog = contents[2]
      
        expect(recentBlog.likes).toEqual(0)
    })
})

describe(('blogs are deleted'), () => {
    test('blogs are deleted successfully', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe(('blogs are updated'), () => {
    test('blogs are updated successfully', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updateBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 10,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const contents = blogsAtEnd.map(r => r.likes)

        expect(contents[0]).toEqual(10)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})