import React from 'react'
import styles from './Textarea.module.scss'


const Textarea = ({register, name, options, error, ...rest}) => {
  return (
    <>
      <textarea
         {...register(name, (options))}
         className={styles.textarea}
         {...rest}
      ></textarea>
      {error && <div className={styles.error}>{error}</div>}
    </>
  )
}

export default Textarea