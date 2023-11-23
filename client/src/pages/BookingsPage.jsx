import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

import PlaceImg from '../components/PlaceImg'
import BookingDates from '../components/BookingDates'

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
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'
            >
              <div className='w-48'>
                <PlaceImg place={booking.place} />
              </div>
              <div className='py-3 pr-3 grow'>
                <h2 className='text-xl'>{booking.place.title}</h2>
                <div className='text-xl'>
                  <BookingDates
                    booking={booking}
                    className='mb-2 mt-4 text-gray-500'
                  />
                  <div className='flex gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-8 h-8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-2xl'>
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
