import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext'
import axios from 'axios'

import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import RegisterPage from './pages/RegisterPage'
import PlacesPage from './pages/PlacesPage'
import PlaceFormPage from './pages/PlaceFormPage'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/' element={<AccountPage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlaceFormPage />} />
          <Route path='/account/places/:id' element={<PlaceFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
