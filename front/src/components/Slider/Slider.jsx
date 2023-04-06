import React, {useState, useEffect} from 'react'
import styles from './Slider.module.scss'
import { sliderData } from './slider-data'


const Slider = () => {
   let [sliderCounter, setSliderCounter] = useState(0)

   // setInterval(() => {
   //    setSliderCounter(sliderCounter + 1 == sliderData.length? 0 : ++sliderCounter)
   // }, 4000)
   
  return (
   <div className={styles.slider}>
      <div className={styles.slide}>
         <img src={sliderData[sliderCounter]?.src} alt=""/>
         <div className={styles.slide__info}>
            <h3>{sliderData[sliderCounter].title}</h3>
            <a>Sign Up</a>
         </div>
         <div className={styles.slide__routing}>
            <button 
               onClick={() => setSliderCounter(
                  sliderCounter - 1 == -1? sliderData.length - 1 : --sliderCounter  
               )}
            >left</button>
            <span>{sliderData[sliderCounter].id}/{sliderData.length}</span>
            <button 
               onClick={() => setSliderCounter(
                  sliderCounter + 1 == sliderData.length? 0 : ++sliderCounter
               )}
            >right</button>
         </div>
      </div>
   </div>
  )
}

export default Slider