import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { $axios } from '../../api'

import styles from './Tag.module.scss'

import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import { MdClose } from 'react-icons/md'
import Loader from '../../components/UI/Loader/Loader'


const Tag = () => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    setLoading(false)
    getAllTags()
  }, [])

  const getAllTags = async () => {
    await $axios.get('/tags')
      .then(res => {
        setTags(res.data)
      })
  }

  const deleteTag = async (id) => {
    setLoading(true)
    await $axios.delete(`/tags/${id}`)
    setLoading(false)
    getAllTags()
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await $axios.post('/tags', {
      name: data.name
    })
    reset()
    setLoading(false)
    getAllTags()
  }

  return (
    <Layout>
      <Header/>
      <div className={styles.pre__tags}>
        <h1>Tags</h1>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors?.name?.message}
            name='name'
            register={register}
            options={{
              required: 'Name is required'
            }}
            type="text"
            placeholder="Enter your tag name"
          />
          <Button text="save"/>
        </form>
        <div className={styles.tags}>
          {tags? (
            <>
              {tags.map(tag => (
                <div key={tag.id} className={styles.tag}>
                  <h2>{tag.name}</h2>
                  <MdClose className={styles.button} onClick={() => deleteTag(tag.id)}/>
                </div>
              ))}
            </>
            ): (
              <h1>Tags not found</h1>
            )}
          { loading && <Loader/> }
        </div>
      </div>
    </Layout>
  )
}

export default Tag