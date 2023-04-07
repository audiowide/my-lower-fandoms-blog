import React from 'react'
import styles from './Header.module.scss'

import {RiMenu2Line} from 'react-icons/ri'
import {AiOutlineUser} from 'react-icons/ai'

const Header = () => {
  return (
    <div className={styles.header}>
      <RiMenu2Line className={styles.header__icon} />
      <div className={styles.header__right}></div>
    </div>
  )
}

export default Header