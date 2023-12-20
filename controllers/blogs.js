const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  //console.log(request.body)
  const body = request.body
  //if either body or url are missing from rewuest send back 400
  if (!body.title || !body.url) {
    response.status(400).send('missing information')
    return
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }
  //console.log(newBlog)

  const blog = new Blog(newBlog)

  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogRouter
