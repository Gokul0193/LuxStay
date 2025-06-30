import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-[#0B5844] transition-all duration-300 '>
      
      <Link to='/' className="flex items-center  gap-2">
                    <img src={assets.logo} alt="logo" className={`h-9 `} /> <span className='text-[#FAF9F6] text-3xl font-bold'>LuxStay</span> 
                
      </Link>
      
    </div>
  )
}

export default Navbar
