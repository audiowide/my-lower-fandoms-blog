import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import { $axios } from '../../api'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
   const {id} = useParams()
   const {isAuth} = useAuth()
   const [userData, setUerData] = useState({})

   useEffect(() => {
      document.title = 'Profile'
      getUserData()
   }, [])

   const getUserData = async () => {
      $axios.get(`/users/${id}`)
         .then((res) => {
            console.log(res.data)
            setUerData(res.data)
         })
   }

  return (
    <Layout>
      <Header/>
      {userData ? (
         <div className={styles.profile}>
            <h1>{userData.name}</h1>
            {isAuth && <h2>{userData.email}</h2>}
         </div>
      ): (
         <div className={styles.profile}>
            <h1>User Not Found</h1>
         </div>
      )}
    </Layout>
  )
}

export default Profile