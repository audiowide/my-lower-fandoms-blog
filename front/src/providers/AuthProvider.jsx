import React, {createContext, useState} from 'react'
import Cookies from 'js-cookie'


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
   const [isAuth, setIsAuth] = useState(!!Cookies.get('Blitzo&Stolas'))
   const [userId, setUserId] = useState(Cookies.get('Blitzo&StolasId'))

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider