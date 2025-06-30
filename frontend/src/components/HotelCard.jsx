import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


const HotelCard = ({image,index,room_id}) => {

    return (
        <Link to={'/rooms/'+room_id} className="rounded-xl shadow-xl overflow-hidden  transition-transform duration-200 ease-out cursor-pointer max-w-72 h-96 bg-white pb-10  relative" 
          key={index}
        >
            

            
            <img src={image} key={index}
                alt="City skyline" className="w-full h-48 object-cover "
            />
{
    
   index % 2 ===0 && <p className='px-3 py-1 absolute text-xs bg-white text-gray-800 font-medium rounded-full top-3 left-3'>
    Best Seller
   </p>
    
}
           
            
            <div className=' mt-7 px-2'>

            
            <div className='flex items-center justify-around space-x-20 '>
                <h3 className="mt-3  pt-3 mb-1 text-lg  text-gray-800">
                The Grand Resort
                 </h3>
                 <div className='flex items-center justify-center mt-5 gap-2'>
                        <img src={assets.starIconFilled} alt="star"  />4.9
                 </div>
                 
            </div>
            <div className='flex items-center justify-center my-2 w-52'>
                <div>
                        <img src={assets.locationIcon} alt="" />
                </div>
                
                 <p className="text-sm px-4   text-gray-600 w-5/6">
               New York
            </p>
            </div>
            <div className='flex items-center justify-around space-x-20'>
                <p>$450 <span className='text-gray-600 text-sm'>/night</span></p>
                <button className='border border-gray-400 p-1 rounded'>Book Now</button>
            </div>
            </div>
           
        </Link>)
}

export default HotelCard
