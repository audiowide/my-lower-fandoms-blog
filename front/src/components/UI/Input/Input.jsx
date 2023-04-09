import React from 'react';
import styles from './Input.module.scss'

const Input = ({ register, name, options, error, ...rest}) => {
  return (
    <>
      <input 
        {...register(name, options)}
        className={styles.input} 
        {...rest}
      />
      {error && <div className={styles.error}>{error}</div>}
    </>
  )
}

export default Input