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

test('api get all blogs works', async () => {
  const blogsStart = blogHelper.initialBlogs
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body).toHaveLength(blogsStart.length)
})

test('id parameter exists', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(blogs.body[0].id).toBeDefined()
})

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

test('adding blog with likes missing defualts to 0', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Emily Cassidy',
    url: 'test url',
  }
  const savedBlog = await api.post('/api/blogs').send(newBlog).expect(201)

  expect(savedBlog.body.likes).toEqual(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
