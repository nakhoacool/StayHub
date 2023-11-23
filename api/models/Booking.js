const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Place' },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  price : { type: Number, require: true },
})

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel