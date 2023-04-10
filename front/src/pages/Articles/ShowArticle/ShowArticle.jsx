import React, { useEffect, useState } from 'react'
import { $axios } from '../../../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './ShowArticle.module.scss'

import Loader from '../../../components/UI/Loader/Loader'
import Header from '../../../components/Header/Header'
import Select from '../../../components/UI/Select/Select'
import Textarea from '../../../components/UI/Textarea/Textarea'

import {MdClose} from 'react-icons/md'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import { useAuth } from '../../../hooks/useAuth'


const ShowArticle = () => {
   const navigate = useNavigate()
   const {slug} = useParams()
   const {isAuth, userId} = useAuth()
   const [showForm, setShowForm] = useState(false)
   const [tags, setTags] = useState([])

   const [article, setArticle] = useState()
   const [error, setError] = useState('')

   useEffect(() => {
      getArticle()
      getAllTags()
   }, [])

   const getArticle = async () => {
      await $axios.get(`/articles/${slug}`)
         .then((res) => {
            setArticle(res.data)
         }).catch((err) => {
            setError(err.response.data.message)
         })
   }

   const getAllTags = () => {
      $axios.get('/tags').then(res => {
         setTags(res.data)
      })
   }

   const {
      register,
      handleSubmit,  
      formState: { errors },
      defaultValue
   } = useForm({
      mode: 'onChange',
   })

   const changeArticle = async (data) => {
      await $axios.put(`/articles/${slug}`, {
         title: data.title,
         tag: +data.tag,
         content: data.content,
      })
        .then((res) => {
         console.log(res.data)
         window.location.reload()
        })
        .catch((err) => {
         setError(err.response.data.message)
        })
        window.location.reload()
   }

   const deleteArticle = async () => {
      await $axios.delete(`/articles/${slug}`)
        .then((res) => {
            navigate('/')
         })
        .catch((err) => {
            setError(err.response.data.message)
         })

         window.location.reload()
   }

  return (
    <div className={styles.article}>
      <Header/>
      {article? (
         <div  className={styles.article__item}>
            <div className={styles.article__item__header}>
               <h1>{article?.title}</h1>
               { isAuth && article?.user?.id == userId ? (
                  <Button text='edit' onClick={() => setShowForm(true)} />
               ): (<></>)}
            </div>
            <div className={styles.article__footer}>
               <a href={`/profile/${article.user.id}`}>{article.user.name}</a>
               <a href={`/`}>{article.tag.name}</a>
            </div>
            <p>{article.content}</p>
            <span>{article.createdAt}</span>
         </div>
      ): error? ( <h1>{error}</h1>) : (<Loader/>)}
      { isAuth && article?.user?.id == userId ? (
      <form
         className={styles.article__form}
         onSubmit={handleSubmit(changeArticle)}
         style={showForm? {display: 'flex'} : {display: 'none'}}
      >
         <div>
         <MdClose 
                  onClick={() => setShowForm(false)} 
                  className={styles.profile__change__close}
               />  
               <h2>Change Profile</h2>
               <Input
                  error={errors?.title?.message}
                  type="text"
                  name="title"
                  register={register}
                  options={{
                     required: 'Title is required'
                  }}   
                  placeholder="Enter your article title"
                  defaultValue={article?.title}
               />
                {tags && (
                  <Select
                     error = {errors?.tag?.message}
                     type="text"
                     name="tag"
                     register={register}
                     options={{
                        required: 'Tag is required'
                     }}
                     tags={tags}
                     startOption='Select a tag'
                     defaultValue={article?.tag?.id}
                  />
               )}
               <p>
                  You don't see your tag?! <a href='/tags'>Add New Tag!</a>
               </p>
               <Textarea
                  error={errors?.content?.message}
                  name="content"
                  register={register}
                  options={{
                     required: 'Content is required'
                  }}
                  placeholder = "Enter your article content"
                  defaultValue={article?.content}
               />

               {error && <p className={styles.error}>{error}</p>}
               <Button text='save' />
         </div>
         <div className={styles.predelete}>
            <Button text='Delete The Article' onClick={deleteArticle} />
         </div>
      </form>
       ): (<></>)}
    </div>
  )
}

export default ShowArticle