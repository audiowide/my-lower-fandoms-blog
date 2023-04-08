import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Auth from '../pages/Auth/Auth'
import SignUp from '../pages/Auth/SignUp'
import { useAuth } from '../hooks/useAuth'
import Profile from '../pages/Profile/Profile'
import Tag from '../pages/Tag/Tag'


const Routers = () => {
  const {isAuth} = useAuth()

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>

        {isAuth && (
          <>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/tags' element={<Tag/>}/>
          </>
        )}

      </Routes>
    </div>
  )
}

export default Routers