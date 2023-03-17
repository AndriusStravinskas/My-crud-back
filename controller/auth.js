const fs = require('fs')
const uid = require("uid")
const addProductToDB = require('../modules/addDataToDB')
const RegisterValidationSchema = require('../validation/register-validate-Schema')
const bcrypt = require("bcrypt")
const userSchema = require('../schemas/user-schema')
const userPostsSchema = require('../schemas/user-posts-schema')


module.exports = {
  register: async (req, res) => {
    const {email, password} = await req.body;

    
    const data = fs.readFileSync('./user.json', 'utf-8')
    const users = JSON.parse(data)
    const checkUsers = users.find((user) => user.email === email)
    if (checkUsers) return res.send({error: true, message: `User with email ${email} exist`});
    
    const validatePost = RegisterValidationSchema.validateSync({email, password})
    const hashedPassword = await bcrypt.hash(validatePost.password, 10);

    const newUser = new userSchema({
      email: validatePost.email,
      password: hashedPassword,
      secret: uid.uid()
    })

    await newUser.save()
   
    res.send(newUser)
   },

   login: async (req, res) => {
    const { email, password } = await req.body;

    const findUserByemail = await userSchema.findOne({email: email})

    if(!findUserByemail) return res.send({error: true, message: "User does not exist"})
    const PasswordMatch = await bcrypt.compare(password, findUserByemail.password)
    if(!PasswordMatch) return res.send({error: true, message: "User does not exist"})
    
    return res.send({
      error: false, 
      message: `user with id: ${findUserByemail.secret} Login successfully`, 
      secret: findUserByemail.secret, 
      loginUserEmail: findUserByemail.email
    })
  
  },

  post: async (req, res) => {
    const postData = await req.body
    const getAllUsers = await userSchema.find()
    const myUser = getAllUsers.find((user) => user.secret === postData.secret)
    const userCreateNewPost = new userPostsSchema({
      email: myUser.email,
      postId: uid.uid(),
      title: postData.title,
      image: postData.image,
      description: postData.description,
      price: postData.price,
    });


    await userCreateNewPost.save()
    console.log(userCreateNewPost)
    res.send({error: false, message: '', userCreateNewPost})
  },

  getAll: async (req, res) => {
    const getAllPosts = await userPostsSchema.find();

    res.send({error: false, message: '', getAllPosts})
  }
}

