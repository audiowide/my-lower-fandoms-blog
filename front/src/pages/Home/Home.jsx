import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import styles from './Home.module.scss'
import Cookies from 'js-cookie'
import { useAuth } from '../../hooks/useAuth'


const Home = () => {
  const [articles, setArticles] = useState([])
  const [articlesInfo, setArticlesInfo] = useState([])

  useEffect(() => {
    getArticles()
  }, [])

  const getArticles = async () => {
    axios('http://localhost:8080/api/articles?updatedAt=desc')
    .then(res => {
        // setArticles(res.data)
        setArticlesInfo(res.data)
      }).catch(err => {
        console.error(err)
      })
  }

  return (
    <Layout>
      <Header/>
      <div className={styles.home}>
        <Search />
        {articlesInfo? (
        <>
          <div className={styles.home__filter}>
            <h1>Articles</h1>
            <span>{articlesInfo?.count}</span>
          </div>
          <div className={styles.articles}>

          </div>
        </>
        ): <>Loading...</>}
      </div>
    </Layout>
  )
}

export default Home