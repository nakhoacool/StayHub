import { useState } from 'react'
import axios from 'axios'
export default function PhotosUploader({ photos, setPhotos }) {
  const [photoLink, setPhotoLink] = useState('')
  async function addPhotoByLink(ev) {
    ev.preventDefault()
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    })
    setPhotos((prev) => [...prev, filename])
    setPhotoLink('')
  }

  function uploadPhoto(ev) {
    ev.preventDefault()
    const formData = new FormData()
    for (let i = 0; i < ev.target.files.length; i++) {
      formData.append('photo', ev.target.files[i])
    }
    axios
      .post('/upload-by-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        setPhotos((prev) => [...prev, ...data])
      })
  }

  function removePhoto(index) {
    setPhotos((prev) => [...prev.filter((_, i) => i !== index)])
  }

  return (
    <>
      <div className='flex gap-2'>
        <input
          type='text'
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder={'Add using link'}
        />
        <button
          onClick={addPhotoByLink}
          className='bg-gray-200 px-4 rounded-2xl'
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {photos.length > 0 &&
          photos.map((link, index) => (
            <div className='h-32 flex' key={index}>
              <img
                className='rounded-2xl w-full h-full object-cover cursor-pointer'
                src={`http://localhost:3000/uploads/${link}`}
                onClick={() => removePhoto(index)}
              />
            </div>
          ))}
        <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
          <input
            type='file'
            multiple
            className='hidden'
            onChange={uploadPhoto}
          />
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
              d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}
