import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const Featureddestination = () => {

  const navigate=useNavigate();
  return (

    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title title='Featured Destination' subTitle='Explore our curated collection of world-class properties, where sophistication meets comfort, and every stay promises a truly unforgettable experience.'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 mt-30'>
        {
        roomsDummyData.map((data,index)=>{
            
                 return  <HotelCard image={data.images[0]} index={index} room_id={data._id} key={index}/>
           
           
        })
        
        }
       
      </div>
      <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)} } className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  )
}

export default Featureddestination
