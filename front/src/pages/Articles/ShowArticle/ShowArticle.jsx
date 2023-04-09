import React, { useEffect, useState } from 'react'
import styles from './ShowArticle.module.scss'
import { $axios } from '../../../api'
import Loader from '../../../components/UI/Loader/Loader'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header/Header'

const ShowArticle = () => {
   const {slug} = useParams()
   const [article, setArticle] = useState()
   const [error, setError] = useState('')

   useEffect(() => {
      getArticle()
   }, [])

   const getArticle = async () => {
      await $axios.get(`/articles/${slug}`)
         .then((res) => {
            setArticle(res.data)
         }).catch((err) => {
            setError(err.response.data.message)
         })
   }

  return (
    <div className={styles.article}>
      <Header/>
      {article? (
         <div  className={styles.article__item}>
            <h1>{article.title}</h1>
            <div className={styles.article__footer}>
               <a href={`/profile/${article.user.id}`}>{article.user.name}</a>
               <a href={`/`}>{article.tag.name}</a>
            </div>
            <p>{article.content}</p>
            <span>{article.createdAt}</span>
         </div>
      ): error? ( <h1>{error}</h1>) : (<Loader/>)}
    </div>
  )
}

export default ShowArticle