import React, { useState, useEffect } from 'react'
import styles from './CreateArticle.module.scss'

import Layout from '../../../components/Layout/Layout'
import Header from '../../../components/Header/Header'

import { useForm } from 'react-hook-form'
import Input from '../../../components/UI/Input/Input'
import Textarea from '../../../components/UI/Textarea/Textarea'
import Select from '../../../components/UI/Select/Select'
import { $axios } from '../../../api'
import Button from '../../../components/UI/Button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/UI/Loader/Loader'


const CreateArticle = () => {
   const navigate = useNavigate()
   const [tags, setTags] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      getAllTags()
   }, [])

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm({
      mode: 'create'
   })

   const getAllTags = () => {
      $axios.get('/tags').then(res => {
         setTags(res.data)
      })
   }


   const AddNewArticle = async (data) => {
      setIsLoading(true)
      $axios.post('/articles', {
         title: data.title,
         tag: parseInt(data.tag),
         content: data.content
      })
         .then(res => {
            console.log(res.data)
            navigate('/')
            reset()
         })
         .catch(err => {
            console.error(err)
         })

      setIsLoading(false)
   }

  return (
    <Layout>
      <Header/>
      <div className={styles.create}>
         { isLoading ?? <Loader/> }
         <h1>Create Article</h1>
         <form onSubmit={handleSubmit(AddNewArticle)}>
            <Input
               error={errors?.title?.message}
               type="text"
               name="title"
               register={register}
               options={{
                  required: 'Email is required'
                }}   
               placeholder="Enter your article title"
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
            />
            <Button text='save' />
         </form>
      </div>
    </Layout>
  )
}

export default CreateArticle