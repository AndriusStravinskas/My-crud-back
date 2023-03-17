const express = require('express')
const fs = require('fs')
const {register, login, post, getAll} = require('../controller/auth')


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/userPost', post)
router.get('/allPosts', getAll)

module.exports = router