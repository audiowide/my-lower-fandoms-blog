import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import styles from './Home.module.scss'
import Cookies from 'js-cookie'
import { useAuth } from '../../hooks/useAuth'
import Tag from '../Tag/Tag'
import Loader from '../../components/UI/Loader/Loader'
import Article from '../../components/Article/Article'


const Home = () => {
  const [articles, setArticles] = useState([])
  const [articlesInfo, setArticlesInfo] = useState([])
  const [publicSort, setPublicSort] = useState('desc')

  useEffect(() => {
    getArticles()
    console.log(publicSort)
  }, [publicSort])

  const getArticles = async () => {
    axios('http://localhost:8080/api/articles',{
      params: {
        updatedAt: {publicSort}
      }
    })
    .then(res => {
        setArticles(res.data.articles)
        setArticlesInfo(res.data)
      }).catch(err => {
        console.error(err)
      })
  }

  return (
    <Layout>
      <Header/>
      <div className={styles.home}>
        <div className={styles.home__public__filter}>
         <button onClick={() => setPublicSort('asc')}>ASC</button>
         <button onClick={() => setPublicSort('desc')}>DESC</button>
        </div>
        {articlesInfo? (
        <div>
          <div className={styles.home__filter}>
            <h1>Articles</h1>
            <span>{articlesInfo?.count}</span>
          </div>
          {articles? (
            <div className={styles.home__articles}>
              {articles.map(article => 
                <Article key={article.id} article={article} />
              )}
            </div>
          ): (<Loader />)}
        </div>
        ): (<Loader/>) }
      </div>
    </Layout>
  )
}

export default Home