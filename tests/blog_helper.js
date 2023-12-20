const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'Test blog', author: 'Joseph Cassidy', url: 'test url', likes: 43 },
  {
    title: 'favorite blog',
    author: 'Emily Cassidy',
    url: 'test url',
    likes: 400,
  },
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  getBlogs,
}
