import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Auth from '../pages/Auth/Auth'


const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  )
}

export default Routers