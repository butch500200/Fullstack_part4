var _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, currentBlog) => {
        return sum + currentBlog.likes
      }, 0)
}

const formatBlog = (blog) => {
  //this uses destructuring to just grab the fields we want
  let result = (({ title, author, likes }) => ({ title, author, likes }))(blog)

  return result
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((sum, currentBlog) => {
        return sum.likes > currentBlog.likes ? sum : formatBlog(currentBlog)
      }, formatBlog(blogs[0]))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  // i tried using lodash flow to do this but couldn't figure it out
  // we count by author, break that objec into key value pais, then get the largest key value pair
  const result = _.maxBy(_.entries(_.countBy(blogs, 'author')), _.last)
  const highest = {
    author: result[0],
    blogs: result[1],
  }

  return highest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
