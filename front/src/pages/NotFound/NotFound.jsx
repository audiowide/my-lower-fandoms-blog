import React from 'react'
import styles from './NotFound.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'


const NotFound = () => {
  return (
    <Layout>
      <Header/>
      <div className={styles.notfound}>
         <h1>Page Not Found</h1>
      </div>
    </Layout>
  )
}

export default NotFound