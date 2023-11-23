import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

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

  return <div></div>
}
