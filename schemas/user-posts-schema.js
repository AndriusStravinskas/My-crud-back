const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userPostsSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  postId: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
});

module.exports = mongoose.model('ca-usersPost', userPostsSchema)