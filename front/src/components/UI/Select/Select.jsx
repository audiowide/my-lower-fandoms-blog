import React from 'react';
import styles from './Select.module.scss'


const Select = ({register, name, options, error, tags, startOption, ...rest}) => {
  return (
   <>
     <select  
      {...register(name, (options))}   
      className={styles.select}
      {...rest}
      >
         <option value='' selected disabled>{startOption}</option>
         {tags.map((tag, index) => (
         <option 
            key={index}
            value={tag.id}
         > {tag.name} 
         </option>
         ))}
      </select>
      {error && <div className={styles.error}>{error}</div>}
   </>
  )
}

export default Select