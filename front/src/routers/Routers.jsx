import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Auth from '../pages/Auth/Auth'
import SignUp from '../pages/Auth/SignUp'
import { useAuth } from '../hooks/useAuth'
import Profile from '../pages/Profile/Profile'
import Tag from '../pages/Tag/Tag'
import CreateArticle from '../pages/Articles/CreateArticle/CreateArticle'
import ShowArticle from '../pages/Articles/ShowArticle/ShowArticle'
import NotFound from '../pages/NotFound/NotFound'


const Routers = () => {
  const {isAuth} = useAuth()

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>

        <Route path='/articles/:slug' element={<ShowArticle/>}/>

        {isAuth && (
          <>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/tags' element={<Tag/>}/>
            <Route path='/articles/add' element={<CreateArticle/>}/>
          </>
        )}

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </div>
  )
}

export default Routers