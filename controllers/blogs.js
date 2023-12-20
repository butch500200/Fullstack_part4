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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log('request blog recived', body)
  if (!body.title || !body.url) {
    response.status(400).send('missing information')
    return
  }
  const { title, author, url, likes } = body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    {
      new: true,
    }
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter
