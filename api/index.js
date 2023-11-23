require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const app = express()

const UserModel = require('./models/User')
const PlaceModel = require('./models/Place')
const BookingModel = require('./models/Booking')

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
//connect to db
mongoose.connect(process.env.MONGO_URL)

//function to verify token and pass it to next middleware
function verifyToken(req, res, next) {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
      if (!err) {
        req.user = decoded
        next()
      } else {
        res.status(401).json({ error: 'Unauthorized' })
      }
    })
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

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
app.get('/profile', verifyToken, (req, res) => {
  res.json(req.user)
})

//logout
app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' })
})

//upload image by link
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)
})

//upload image by file
const storage = multer.diskStorage({
  destination: __dirname + '/uploads/',
  filename: (req, file, cb) => {
    cb(null, 'photo' + Date.now() + '.jpg')
  },
})
const upload = multer({ storage })
app.post('/upload-by-file', upload.array('photo'), (req, res) => {
  const filenames = req.files.map((file) => file.filename)
  res.json(filenames)
})

//get places
app.get('/get-places', verifyToken, async (req, res) => {
  const places = await PlaceModel.find({ owner: req.user.id })
  res.json(places)
})

//get place by id
app.get('/get-place/:id', async (req, res) => {
  const { id } = req.params
  res.json(await PlaceModel.findById(id))
})

//add places
app.post('/add-place', verifyToken, async (req, res) => {
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body
  const place = await PlaceModel.create({
    owner: req.user.id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  })
  res.json(place)
})

//update place
app.put('/update-place/', verifyToken, async (req, res) => {
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body
  const place = await PlaceModel.findByIdAndUpdate(
    id,
    {
      owner: req.user.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    },
    { new: true }
  )
  res.json(place)
})

//get all places
app.get('/places', async (req, res) => {
  const places = await PlaceModel.find()
  res.json(places)
})

//book a place
app.post('/book-place', verifyToken, async (req, res) => {
  const { place, checkIn, checkOut, guests, name, phone, price } = req.body
  const userData = req.user
  const booking = await BookingModel.create({
    place,
    user: userData.id,
    checkIn,
    checkOut,
    guests,
    name,
    phone,
    price,
  })
  res.json(booking)
})

//get bookings
app.get('/get-bookings', verifyToken, async (req, res) => {
  const userData = req.user
  const bookings = await BookingModel.find({ user: userData.id })
  res.json(bookings)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
