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

test('id parameter exits', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(blogs.body[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})
