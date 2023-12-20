const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedOject) => {
    returnedOject.id = returnedOject._id.toString()
    delete returnedOject._id
    delete returnedOject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
