import React, { useEffect, useState } from 'react'
import heroImage from '../assets/heroImage.png'
import { assets, cities } from '../assets/assets'
import { userData } from '../common/userDetails'
const Hero = () => {
  const [user,setUser]=useState({})
   useEffect(()=>{
    setUser(userData)
   },[])
  
  
  return (
    <div  style={{backgroundImage: `url(${heroImage})`}}
      className=" flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-cover  bg-no-repeat bg-center h-screen ">
    
      <p className='bg-[#c18D52]/80 px-3.5 py-1 rounded-full mt-20'>Indulge in Timeless Elegance</p>
      <h1 className='font-playfair text-2xl md:text-5xl md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Hello {user?.name || 'Guest'}<br /> Unwind Where Luxury Knows No Bounds</h1>
      <p className='max-w-130 my-5 text-sm md:text-base '>Exceptional comfort and timeless elegance — only at the world’s most exclusive destinations</p>

      <form className='bg-white text-gray-500 rounded-lg px-6 py-4  flex-col hidden  md:flex-row max-md:items-start gap-4 max-md:mx-auto '>

            <div>
                <div className='flex items-center gap-2'>
                   <img src={assets.calenderIcon} alt="calender" className='h-4' />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {
                      cities.map((city,index)=>{
                        return <option value={city} key={index}></option>
                      })
                    }
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                   <img src={assets.calenderIcon} alt="calende" className='h-4' />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                     <img src={assets.calenderIcon} alt="calende" className='h-4' />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-[#c18D52] py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="search" className='h-6' />
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero
