import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

import styles from './Auth.module.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useAuth } from '../../hooks/useAuth'

import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import { $axios } from '../../api'


const SignUp = () => {
  const navigate = useNavigate()

  const {
        register, 
        handleSubmit, 
        formState:{errors}, 
        reset
      } = useForm({
    mode: 'onChange'
  })

  const {isAuth, setIsAuth} = useAuth()
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const onSubmit = async (data) => {
    await $axios.post('/auth/sign-up', {
      name: data.name,
      email: data.email,
      password: data.password
    }).then((response) => {
      Cookies.set('Blitzo&Stolas', response.data.token)
      setIsAuth(true)
      navigate('/')
    }).catch((error) => {
      setRequestError(error.response.data.message)
    })
	}

  return (
    <Layout >
      <Header/>
      <div className={styles.auth} >
          <form action="" className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign Up</h1>
            <Input 
              error={errors?.name?.message}
              name='name'
              register={register}
              options={{
                required: 'Name is required'
              }}
              type='text'
              placeholder = 'Enter your name'
              />
            <Input 
              error={errors?.email?.message}
              name='email'
              register={register}
              options={{
                required: 'Email is required'
              }}
              type='email'
              placeholder = 'Enter your email'
              />
            <Input
              error={errors?.password?.message}
              name='password'
              register={register}
              options={{
                required: 'Password is required'
              }}
              type = 'password'
              placeholder = 'Enter your password'
              />
            {requestError? <div className='error'>{requestError}</div>: <></>}
            <Button text='continue' />
            <p>I have an account in this place. <a href='sign-up'>Sign In</a></p>
        </form>
      </div>
    </Layout>
  )
}

export default SignUp