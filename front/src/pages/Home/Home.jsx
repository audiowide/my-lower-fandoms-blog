import React from 'react'
import styles from './Home.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <Layout>
      <Header/>
      <div className={styles.home}>
        Home
      </div>
    </Layout>
  )
}

export default Home