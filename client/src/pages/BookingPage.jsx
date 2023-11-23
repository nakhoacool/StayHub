import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import AddressLink from '../components/AddressLink'
import PlaceGallery from '../components/PlaceGallery'

export default function BookingPage() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(() => {
    axios.get('/get-bookings').then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === id)
      if (foundBooking) setBooking(foundBooking)
    })
  }, [id])

  if (!booking) return <div>loading...</div>

  return <div className='my-8'>
    <h1 className='text-3xl'>
      {booking.place.title}
    </h1>
    <AddressLink place={booking.place} className={'my-2 block'} />
    <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
      <h2 className='text-xl'>Your booking information</h2>
    </div>
    <PlaceGallery place={booking.place} />
  </div>
}
