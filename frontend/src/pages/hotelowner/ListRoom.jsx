import React, { useEffect, useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'
import { getRoomDetails,updateRoomDetails } from '../../controller/hotelController'

import { userData } from '../../common/userDetails'

const ListRoom = () => {
      const user=userData()
      
      
const [room,setRoom]=useState()

useEffect(()=>{
  
  const fetchData=async()=>{
    const rooms=await getRoomDetails(user.hotelId);
  setRoom(rooms.data)
  }
  fetchData()
  
},[])

const handelRoomUpdate=async(roomId,isAvailable)=>{

  try {
    
    const result=await updateRoomDetails(roomId,isAvailable);
    setRoom(prev=>prev.map((room)=>{
     return room.id===roomId ? {...room,isAvailable:result.data.isAvailable}:room
    }))
    
  } catch (error) {
    console.log(error);
    
  }

  
  
}


   
      
  return (
    <div>
        <Title align='left' title='Room Listing' subTitle='View,edit,or manage all listed room. Keep the information up-to-date to provide the best experience for users.' />
        <p className='
        text-gray-500 mt-8'>All Rooms</p>
         <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>

          <table className='w-full '>
             <thead className='bg-gray-50'>
                 <tr>
                  <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                  <th className='py-3 px-4 text-gray-800 max-sm:hidden font-medium'>Facility</th>
                  <th className='py-3 px-4 text-gray-800 font-medium '>Price / night</th>
                  <th className='py-3 px-4 text-gray-800 font-medium '>Actions</th>
                 </tr>
              </thead>

              <tbody className='text-sm'>
                  {
                    room?.map((item,index)=>{
                      return <tr key={index}>
                          <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                            {item.roomType}
                          </td>

                           <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                             {
                              Object.entries(item.amenities)
                              .filter(([key,value])=>value)
                              .map(([key])=>key)
                              .join('.')
                             }
                          </td>

                           <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>$
                            {item.price}
                          </td>

                           <td className='py-3 px-4  border-t border-gray-300 text-sm text-red-500 text-center'>
                           

                            <label className='flex cursor-pointer select-none items-center' >
        <div className='relative'>
          <input
            type='checkbox'
            checked={item.isAvailable}
           onChange={()=>handelRoomUpdate(item.id,!item.isAvailable)}
            className='sr-only'
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              item.isAvailable ? 'bg-blue-500' : 'bg-black'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              item.isAvailable ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
      </label>
                          </td>
                      </tr>
                    })
                  }
              </tbody>
          </table>
         </div>
    </div>
  )
}

export default ListRoom
