import React from 'react'
import styles from './Article.module.scss'


const Article = ({ article }) => {
  return (
   <div className={styles.article} key={article.id}>
      <a href={`/articles/${article.slug}`} 
         className={styles.article__title}
      >{article.title}</a>
      <div className={styles.article__footer}>
         <a href={`/profile/${article?.user?.id}`}>{article?.user?.name}</a>
         <a href={`/`}>{article?.tag?.name}</a>
      </div>
      <p>{article.content.slice(0, 100)}</p>
      <span>{article.createdAt}</span>
   </div>
  )
}

export default Article