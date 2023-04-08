import React from 'react';
import styles from './Search.module.scss'

import { useForm } from 'react-hook-form'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {FaSearch} from 'react-icons/fa';

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode: 'search'})
  
  const onSubmit = data => {
  }

  return (
    <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
      <Input 
        error={errors?.search?.message}
        register={register}
        name = "search"
        options={{
          required: ''
        }}
        type='text' 
        placeholder='Search'
      />
    </form>
  )
}

export default Search