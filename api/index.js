require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const UserModel = require('./models/User')

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
//connect to db
mongoose.connect(process.env.MONGO_URL)

//register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  try {
    const user = await UserModel.create({
      name,
      email,
      password: hash,
    })
    res.json(user)
  } catch (error) {
    res.status(422).json(error)
  }
})

//login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    return res.status(422).json({ error: 'Invalid email or password' })
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(422).json({ error: 'Invalid email or password' })
  }
  jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      if (!err) {
        res.cookie('token', token).json(user)
      } else {
        res.status(422).json(err)
      }
    }
  )
})
//get user profile name, email and id then pass it to the userContext
app.get('/profile', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
      if (!err) {
        res.json(decoded)
      } else {
        res.status(401).json({ error: 'Unauthorized' })
      }
    })
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
