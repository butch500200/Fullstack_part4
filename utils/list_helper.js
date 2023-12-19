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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.reduce((sum, current) => {
    //if the authos has not been added, add it
    if (sum[current.author] === undefined) {
      sum[current.author] = {
        author: current.author,
        likes: 0,
      }
    }

    sum[current.author].likes += current.likes
    return sum
  }, [])

  const maxAuthor = Object.entries(authors).reduce((max, current) => {
    return max.likes === undefined || max.likes < current[1].likes
      ? current[1]
      : max
  }, {})

  //console.log('maxAuthor', maxAuthor)

  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
