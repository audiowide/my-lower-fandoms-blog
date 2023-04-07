import React from 'react'
import styles from './Layout.module.scss'
import Slider from '../Slider/Slider'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Slider/>
      <div className={styles.layout__content}>
      {children}
      </div>
    </div>
  )
}

export default Layout