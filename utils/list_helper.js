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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
