import React, { useEffect, useState } from 'react'
import { assets, cities } from '../assets/assets'
import { hotelRegistration } from '../controller/hotelController';
import { userData, userId } from '../common/userDetails';
import { updateUser } from '../controller/authController';


export const HotelReg = ({ onClose, onRegisterComplete }) => {

    const [form,setForm]=useState({hotel:'',phone:'',address:'',city:''})

     const handleRegister = async(e)=>{
                 e.preventDefault();
            try {
                const{hotel,phone,address,city}=form;
                const currentUser=userData();
                const currentUserId=userId()
                console.log("usedta",currentUserId);
                
         const result= await hotelRegistration(currentUserId,hotel,phone,address,city);
         if (result) {
           
           await updateUser(currentUserId,currentUser.name,currentUser.email,
            currentUser.role,
            true
            )
           
          
            
localStorage.setItem('Users', JSON.stringify({
    ...currentUser,
    isHotelRegistered: true,
    hotelId:result.data.
hotelId
    
}));

const da=userData()
console.log("after Reg",da);

             if (onRegisterComplete) onRegisterComplete();
            alert("Hotel Registered successfully.");
         }
            
            }catch (error) {
                console.error(error);
                alert('Registration Failed')
            }
    }
  return (
   <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
        <form onSubmit={handleRegister} className='flex bg-white rounded-xl  max-w-4xl max-md:mx-2'>
            <img src={assets.regImage}  alt="regimag" className='w-1/2 rounded-xl hidden md:block'/>

            <div className='relative flex flex-col
            items-center md:w-1/2 p-8 md:p-10'>
                <img src={assets.closeIcon} onClick={()=>onClose&&onClose()} alt="close icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
                <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>
                {/* Hotel Name */}
                <div className='w-full mt-4'>
                    <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                <input id='name' type="text" value={form.hotel} onChange={(e)=>{
                    setForm({...form ,hotel:e.target.value});
                }} placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#0B5844] font-light' required />
                </div>

                {/* Phone */}
                <div className='w-full mt-4'>
                    <label htmlFor="contact" className='font-medium text-gray-500'>Phone</label>
                <input id='contact' type="text" value={form.phone} onChange={(e)=>{
                    setForm({...form ,phone:e.target.value});
                }}placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#0B5844] font-light' required />
                </div>
                {/* Address */}
                <div className='w-full mt-4'>
                    <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                <input id='address' type="text" value={form.address} onChange={(e)=>{
                    setForm({...form ,address:e.target.value});
                }} placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#0B5844] font-light' required />
                </div>
                {/* Select city Drop Down */}
                <div className='w-full mt-4 max-w-60 mr-auto'>
                    <label htmlFor="city" className='font-medium text-gray-500'></label>
                    <select  id="city" value={form.city} onChange={(e)=>{
                    setForm({...form ,city:e.target.value});
                }} className='border border-gray-500 rounded w-full px-3 py-2.5 mt-1 outline-[#0B5844] font-light' required>
                        <option value="">Select City</option>
                        {
                            cities.map((city)=>{
                                return <option value={city} key={city}>{city}</option>
                            })
                        }
                    </select>
                </div>
                <button className='bg-[#c18D52]/90 hover:bg-[#c18D52] transition-all text-white mr-auto px-6 py-2  rounded cursor-pointer mt-6'>
                Register
                </button>
            </div>

            
        </form>
      
    </div>
  )
}

export default HotelReg
