import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import { $axios } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Article from '../../components/Article/Article'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import { useForm } from 'react-hook-form'
import Input from '../../components/UI/Input/Input'
import {MdClose} from 'react-icons/md'


const Profile = () => {
   const {id} = useParams()
   const {isAuth, userId} = useAuth()

   const [userData, setUerData] = useState({})
   const [changeFormShow, setChangeFormShow] = useState(false)
   const [error, setError] = useState('')

   useEffect(() => {
      document.title = 'Profile'
      getUserData()
   }, [])

   const getUserData = async () => {
      $axios.get(`/users/${id}`)
         .then((res) => {
            setUerData(res.data)
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

   const changeData = async (data) => {
      await $axios.put(`/users/${id}`, {
         name: data.name,
         email: data.email,
      })
        .then((res) => {
         console.log(res.data)
         window.location.reload()
        })
        .catch((err) => {
         setError(err.response.data.message)
        })
   }

  return (
    <Layout>
      <Header/>
      {userData ? (
         <div className={styles.profile}>
            <div className={styles.profile__data}>
               <div className="">
                  <h1>{userData.name}</h1>
                  {isAuth && <h2>{userData.email}</h2>}
               </div>
               {+userData.id === +userId? (
                  <Button text='edit' onClick={() => setChangeFormShow(true)} />
               ): (<></>)}
            </div>
            {+userData.id === +userId? (
               <form 
               onSubmit={handleSubmit(changeData)} 
               className={styles.profile__change}
               style={changeFormShow? {display: 'flex'} : {display: 'none'}}
            >
               <MdClose 
                  onClick={() => setChangeFormShow(false)} 
                  className={styles.profile__change__close}
               />  
               <h2>Change Profile</h2>
               <Input
                  name="name"
                  error={errors?.name?.message}
                  register={register}
                  placeholder={userData.name}
                  type="text"
                  options={{
                     required: 'Name is required'
                  }}
                  defaultValue={userData.name}
               />
               <Input
                  name="email"
                  error={errors?.email?.message}
                  register={register}
                  placeholder={userData.email}
                  type="text"
                  options={{
                     required: 'Email is required'
                  }}
                  defaultValue={userData.email}
               />
               {error && <p className={styles.error}>{error}</p>}
               <Button text='save' />
            </form>
            ): (<></>)}
            {userData.articles? (
              <div className={styles.profile__articles}>
               {userData.articles.map((article,index) => 
                  <Article key={index} article={article} />
            )}
              </div>
          ): (<Loader/>)}
         </div>
      ): (<Loader/>)}
    </Layout>
  )
}

export default Profile