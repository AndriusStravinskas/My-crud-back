const express = require('express')
const cors = require('cors')
const router = require('./router/router')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.congcgj.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log('DB CONNECTION SUCCESS')
}).catch((err) => {
  console.log(err)
})

const api = express()

api.use(cors())
api.use(express.json())
api.use('/', router)

api.listen(3600, () => {
  console.log('server is running on: http://localhost:3600');
})