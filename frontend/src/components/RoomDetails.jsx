import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, hotels, roomCommonData, roomsDummyData } from '../assets/assets';
import StarRating from './StarRating';
import { bookings } from '../controller/hotelController';
import { userId } from '../common/userDetails';


const RoomDetails = () => {
    const {id} =useParams();
    const [room,setRoom]=useState(null);
     const [mainImg,setMainImg]=useState(null);
    const [bookInput,setBookInput]=useState({checkIn:'',checkOut:'',guests:'',paid:false})
     useEffect(()=>{

        
        
       

       console.log("local storage",JSON.parse(localStorage.getItem('hotelData')));

       const hotelData=JSON.parse(localStorage.getItem('hotelData'));
       let foundRoom=null;
       let foundHotel=null;
      for (const hotel of hotelData) {
    const room = hotel.rooms.find(ro => ro.roomId === id);
    if (room) {
        foundRoom = {...room};
        foundHotel={hotel:hotel.hotel,owner:hotel.owner,...room}
        
        break;
    }
}
console.log(foundHotel);
console.log(userId());

 foundHotel && setRoom(foundHotel);
        foundHotel && setMainImg(foundHotel.images[0])

      
       

       
        
     },[])

    
     const handleSubmit= async(e)=>{
       e.preventDefault()

        try {
             const uid=userId()
            const booking =await bookings(uid,room.roomId,room.hotel.hotelId,bookInput);
            setBookInput({checkIn:'',checkOut:'',guests:'',paid:false})
            
            alert("Room Booked Sucessfully")

            
        } catch (error) {
            console.log("somethin wrong");
            
        }
     }

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* Room Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl '>{room.hotel.hotel} <span className='text-sm'>({room.roomType})</span></h1>
        <p className='text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

        {/* Room Rating */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating rating={5}/>
            <p className='ml-2'>200+ reviews</p>
        </div>

        {/* Room address */}
        <div className='flex items-center gap-1 text-gray-500  mt-2'>
            <img src={assets.locationIcon} alt="location" />
            <span>{room.hotel.address}</span>
        </div>

        {/* Room Image */}
        <div className='flex flex-col md:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImg} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 md:w-11/12            object-cover'>
                {
                    room?.images.length >1 && room.images.map((image,index)=>{
                        return <img src={image}  key={index} alt="room image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImg===image&& 'outline-3 outline-orange-500'}`} onClick={()=>{
                            return setMainImg(image);
                        }} />
                    })
                }
            </div>
        </div>
        {/* Room Higlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl '>Experience Luxury Like Never Before</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4
                '>
                    {
                        Object.entries( room.amenities).map(([key,value],index)=>{
                            return value && <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img    src={facilityIcons[key]} alt={key} className='w-5 h-5' />
                                <p className='text-xs'>{key}</p>
                            </div>
                        })
                       
                    }
                </div>
            </div>
            
            {/* Room Price */}
            <p className='text-2xl font-medium flex  md:flex items-center gap-2'>$ {room.price
}/night</p>

        </div>

        {/* Check In Form */}
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16
        max-w-6xl'>
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In </label>
                        <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required  value={bookInput.checkIn} onChange={(e)=>setBookInput(prev=>({...prev,checkIn:e.target.value,}))} />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required value={bookInput.checkOut} onChange={(e)=>setBookInput(prev=>({...prev,checkOut:e.target.value}))} />
                    </div>
                        <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none ' required value={bookInput.guests} onChange={(e)=>setBookInput(prev=>({...prev,guests:e.target.value,}))} />
                    </div>
                
            </div>

            <button type='submit' className='bg-blue-500  hover:bg-primary  active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                 Book Now
            </button>

        </form>

        {/* Common spec */}
        <div className='mt-25 space-y-4'>
            {
                roomCommonData.map((spec,index)=>{
                    return <div key={index} className='flex items-start gap-2'>
                            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                            <div>
                                <p className='text-base'>{spec.title}</p>
                                <p className='text-gray-500'>{spec.description}</p>
                            </div>
                    </div>
                })
            }
        </div>

        <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
            <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
        </div>

        {/* Hosted By */}
        <div className='flex flex-col items-start gap-4'>
            <div className='flex gap-4'>
                {/* <img src={room.hotel.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full ' /> */}
            </div>
            <p className='text-lg md:text-xl'>Hosted by {room.hotel.hotel}</p>
            <div className='flex items-center mt-1'>
                <StarRating rating={5}/>
                <p className='ml-2'>200+ reviews</p>
            </div>
        </div>
        <button  className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer '>Contact Now </button>
      
    </div>
  )
}

export default RoomDetails
