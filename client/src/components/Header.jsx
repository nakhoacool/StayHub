import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Header() {
  const { user } = useContext(UserContext)
  return (
    <header className='flex justify-between'>
      <Link to={'/'} href='' className='flex items-center gap-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8 -rotate-90'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
          />
        </svg>
        <span className='font-bold text-xl'>airbnb</span>
      </Link>
      <div className='flex items-center gap-2 border border-grey-300 rounded-full py-2 px-4'>
        <Link
          to={user ? '/account' : '/login'}
          className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 reletive top-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </Link>
        {!!user && <div>{user.name}</div>}
      </div>
    </header>
  )
}
