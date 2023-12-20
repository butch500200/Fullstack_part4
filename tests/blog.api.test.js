const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const blogHelper = require('./blog_helper.js')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const personObjects = blogHelper.initialBlogs.map((p) => new Blog(p))
  const promiseArry = personObjects.map((p) => p.save())

  await Promise.all(promiseArry)
})
describe('getting blogs', () => {
  test('api get all blogs works', async () => {
    const blogsStart = blogHelper.initialBlogs
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogs.body).toHaveLength(blogsStart.length)
  })
})

describe('formatting test', () => {
  test('id parameter exists', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('Adding blogs', () => {
  test('adding a new blog', async () => {
    const blogsStart = await Blog.find({})

    const newBlog = {
      title: 'new blog',
      author: 'Emily Cassidy',
      url: 'test url',
      likes: 400,
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsEnd = await Blog.find({})

    expect(blogsEnd).toHaveLength(blogsStart.length + 1)
    const titles = blogsEnd.map((blog) => blog.title)

    expect(titles).toContainEqual(newBlog.title)
  })

  test('adding blog with likes missing defaults to 0', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Emily Cassidy',
      url: 'test url',
    }
    const savedBlog = await api.post('/api/blogs').send(newBlog).expect(201)

    expect(savedBlog.body.likes).toEqual(0)
  })

  test('adding invalid blog', async () => {
    const newBlog = {
      author: 'Emily Cassidy',
      url: 'test url',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsEnd = await Blog.find({})
    expect(blogsEnd).toHaveLength(blogHelper.initialBlogs.length)
  })
})

describe('deleting blogs', () => {
  test('delete by id', async () => {
    const blogsStart = await Blog.find({})

    await api.delete(`/api/blogs/${blogsStart[0].id}`).expect(204)

    const blogsEnd = await Blog.find({})

    expect(blogsEnd).toHaveLength(blogsStart.length - 1)
    const titles = blogsEnd.map((blog) => blog.title)

    expect(titles).not.toContainEqual(blogsStart[0].title)
  })
})

describe('Updating blogs', () => {
  test('updating likes', async () => {
    const blogsStart = await blogHelper.getBlogs()
    const firstBlog = blogsStart[0]
    //console.log('likes at the start', firstBlog.likes)
    firstBlog.likes += 400
    //console.log('updated blog', firstBlog)
    await api.put(`/api/blogs/${firstBlog.id}`).send(firstBlog).expect(200)

    const blogsEnd = await blogHelper.getBlogs()
    expect(blogsEnd).toHaveLength(blogsStart.length)

    const updatedBlogResult = await Blog.findById(firstBlog.id)
    console.log('updated Blog', updatedBlogResult)
    //console.log('first blog', blogsStart[0])
    expect(updatedBlogResult.likes).toEqual(firstBlog.likes)
  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
