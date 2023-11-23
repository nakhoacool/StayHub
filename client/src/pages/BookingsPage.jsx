import { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    axios.get('/get-bookings').then(({ data }) => {
      setBookings(data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length === 0 && (
          <div className='text-center mt-8'>You have no bookings yet.</div>
        )}
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id} className='bg-gray-100 p-4 rounded-2xl'>
              <div className='flex gap-4'>
                <div className='flex w-32 h-32 object-cover rounded-2xl bg-gray-300 grow shrink-0'>
                  {booking.place.photos?.length > 0 && (
                    <img
                      className='object-cover'
                      src={
                        'http://localhost:3000/uploads/' +
                        booking.place.photos[0]
                      }
                      alt={booking.place.title}
                    />
                  )}
                </div>
                <div className='flex-grow-0 flex-shrink'>
                  <h2 className='text-xl'>{booking.place.title}</h2>
                  <p className='text-sm mt-2'>{booking.place.description}</p>
                </div>
              </div>
              <div className='mt-4'>
                <div className='flex gap-4'>
                  <div className='flex-grow-0 flex-shrink'>
                    <h3 className='text-sm'>Check-in</h3>
                    <div className='text-xl'>{booking.checkIn}</div>
                  </div>
                  <div className='flex-grow-0 flex-shrink'>
                    <h3 className='text-sm'>Check-out</h3>
                    <div className='text-xl'>{booking.checkOut}</div>
                  </div>
                  <div className='flex-grow-0 flex-shrink'>
                    <h3 className='text-sm'>Guests</h3>
                    <div className='text-xl'>{booking.guests}</div>
                  </div>
                </div>
                <div className='mt-4'>
                  <h3 className='text-sm'>Total</h3>
                  <div className='text-xl'>${booking.price}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
