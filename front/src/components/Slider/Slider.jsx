import React, {useState, useEffect} from 'react'
import styles from './Slider.module.scss'
import { sliderData } from './slider-data'
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'
import { useAuth } from '../../hooks/useAuth'


const Slider = () => {
   const {isAuth} = useAuth()
   let [sliderCounter, setSliderCounter] = useState(0)
   let [isAnimation, setIsAnimation] = useState(false)

   // setInterval(() => {
   //    setSliderCounter(sliderCounter + 1 == sliderData.length? 0 : ++sliderCounter)
   // }, 4000)


   useEffect(() => {
      setIsAnimation(true)
      setTimeout(() => {
         setIsAnimation(false)
      }, 2000)
   }, [sliderCounter])

   
  return (
   <div className={styles.slider}>
      <div 
         className={`${styles.slide} ${isAnimation ? styles.show : null}`} 
      >
         <img 
            src={sliderData[sliderCounter]?.src} 
            alt=""
         />
         <div className={styles.slide__info}>
            <h3>{sliderData[sliderCounter].title}</h3>
            {isAuth ? (
               <a href="/articles/add">Add Article</a>
            ): (
               <a href="/sign-up">Sign Up</a>
            )}
         </div>
         <div className={styles.slide__routing}>
            <button 
               onClick={() => {setSliderCounter(
                  sliderCounter - 1 == -1? sliderData.length - 1 : --sliderCounter  
               ); }}
            ><AiOutlineArrowLeft/></button>
            <div>
               {sliderData[sliderCounter].id}
               <span 
                  style={{width: `${sliderData.length * 20}px` }}
               >
                  <span 
                     style={{width: `${sliderData[sliderCounter].id * 20}px`}}
                  ></span>
               </span>
               {sliderData.length}
            </div>
            <button 
               onClick={() => setSliderCounter(
                  sliderCounter + 1 == sliderData.length? 0 : ++sliderCounter
               )}
            ><AiOutlineArrowRight/></button>
         </div>
      </div>
   </div>
  )
}

export default Slider