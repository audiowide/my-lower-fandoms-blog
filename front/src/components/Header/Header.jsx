import React, {useState} from 'react'
import styles from './Header.module.scss'
import Cookies from 'js-cookie';
import {MdClose} from 'react-icons/md'

import {RiMenu2Line} from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()

  const {isAuth, userId} = useAuth()
  const [headerIsOpen, setHeaderIsOpen] = useState(false)

  const Logout = () => {
    Cookies.remove('Blitzo&Stolas')
    Cookies.remove('Blitzo&StolasId')

    navigate('/auth')
    window.location.reload();
  }

  return (
    <div className={styles.header}>
      <a href="/">Home</a>
      {headerIsOpen? (
        <MdClose 
          className={styles.header__icon} 
          onClick={() => setHeaderIsOpen(headerIsOpen? false: true)}
        />
      ): (
        <RiMenu2Line 
          className={styles.header__icon} 
          onClick={() => setHeaderIsOpen(headerIsOpen? false: true)}
        />
      )}
      <div 
        className={styles.header__menu}
        style={headerIsOpen? {display: 'flex'} : {display: 'none'}}
      >
        <a href="/">Home</a>
        <a href="/tags">Tags</a>
        {isAuth ? (
          <>
          <a href='/articles/add'>Add New Article</a>
          <a href={`/profile/${userId}`}>Profile #{userId}</a>
          <a onClick={Logout}>Logout</a>
          </>
        ): (
         <>
           <a href="/auth">Sign In</a>
           <a href="/sign-up">Sign Up</a>
         </>
        )}
      </div>
    </div>
  )
}

export default Header