import React from 'react'
import styles from './Home.module.scss'
import Layout from '../../components/Layout/Layout'

const Home = () => {
  return (
    <Layout>
      <div className={styles.home}>
      Home
      </div>
    </Layout>
  )
}

export default Home