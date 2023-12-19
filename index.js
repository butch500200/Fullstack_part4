const express = require('express')
const app = express()
const config = require('./utils/config.js')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs.js')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
