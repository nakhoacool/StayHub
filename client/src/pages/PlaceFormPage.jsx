import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Perks from '../components/Perks'
import PhotosUploader from '../components/PhotosUploader'
import AccountNav from '../components/AccountNav'

export default function PlaceFormPage() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [photos, setPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/get-place/' + id).then((response) => {
      const place = response.data
      setTitle(place.title)
      setAddress(place.address)
      setPhotos(place.photos)
      setDescription(place.description)
      setPerks(place.perks)
      setExtraInfo(place.extraInfo)
      setCheckIn(place.checkIn)
      setCheckOut(place.checkOut)
      setMaxGuests(place.maxGuests)
    })
  }, [id])
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

  async function addNewPlace(ev) {
    ev.preventDefault()
    if (id) {
      await axios.put('/update-place/' + id, {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      })
      setRedirect(true)
    } else {
      const placeData = {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      }
      await axios.post('/add-place', placeData)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
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
        {preInput('Extra info', 'Add any extra info that guests should know')}
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
  )
}
