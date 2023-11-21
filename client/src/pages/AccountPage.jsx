import axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)
  let { subpage } = useParams()

  if (subpage === undefined) {
    subpage = 'account'
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6'
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!ready) {
    return <div>Loading...</div>
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className='w-full flex mt-8 mb-8 gap-2 justify-center'>
        <Link className={linkClasses('account')} to={'/account'}>
          My account
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My places
        </Link>
      </nav>
      {subpage === 'account' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
