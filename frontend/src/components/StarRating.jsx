import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({rating}) => {
  return (
    <>
      {Array(5).fill('').map((_, index) => (
                
                <img src={rating>index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className='w-4.5 h-4.5' key={index} />
                            ))}
    </>
  )
}

export default StarRating
