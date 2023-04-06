import React from 'react'
import styles from './Layout.module.scss'
import Slider from '../Slider/Slider'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Slider/>
      {children}
    </div>
  )
}

export default Layout