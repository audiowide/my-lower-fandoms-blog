import React, { useEffect } from 'react'
import styles from './Profile.module.scss'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import { $axios } from '../../api'
import { useParams } from 'react-router-dom'

const Profile = () => {
   const {id} = useParams()
   const [userData, setUerData] = useState({})

   useEffect(() => {
      document.title = 'Profile'
      getUserData()
   })

   const getUserData = async () => {
      $axios.post(`/users/${id}`)
         .then((res) => {
            console.log(res.data)
         })
   }

  return (
    <Layout>
      <Header/>
      <div className={styles.profile}>
         <h1></h1>
      </div>
    </Layout>
  )
}

export default Profile