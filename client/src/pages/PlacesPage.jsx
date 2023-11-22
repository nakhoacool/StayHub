import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Perks from '../components/Perks'
import PhotosUploader from '../components/PhotosUploader'
import axios from 'axios'

export default function PlacesPage() {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [photos, setPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>
  }

  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    )
  }

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link
            className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
            to={'/account/places/new'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput('Title', 'Give your place a title that stands out')}
            <input
              type='text'
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder='My lovely house'
            />
            {preInput('Address', 'Enter the address for your place')}
            <input
              type='text'
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder='123 Main St, Anytown, USA'
            />
            {preInput(
              'Photos',
              'Add photos so guests can get a sense of your place'
            )}

            <PhotosUploader photos={photos} setPhotos={setPhotos} />

            {preInput('Description', 'Describe your place to guests')}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder='Describe your place to guests'
            />
            {preInput('Perks', 'Select all that apply to your place')}
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selecetedPerks={perks} onChange={setPerks} />
            </div>
            {preInput(
              'Extra info',
              'Add any extra info that guests should know'
            )}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              placeholder='Add any extra info that guests should know'
            />
            {preInput(
              'Check in&out times, max guests',
              'Set your check in&out times and max number of guests'
            )}
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input
                  type='text'
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder='14:00'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input
                  type='text'
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder='20:00'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input
                  type='number'
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  placeholder='4'
                />
              </div>
            </div>
            <div>
              <button className='primary my-4'>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
