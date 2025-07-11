import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, bookings, userBookingsDummyData } from '../assets/assets'
import { userId } from '../common/userDetails'
import { getBookings, Payment } from '../controller/hotelController'
import Loader from './Loader'

const MyBookings = () => {

    const [Bookings,setBookings]=useState([])
    const [state,setState]=useState()
    const [updatePayment,setUpdatePayment]=useState(false)
    useEffect(()=>{
        const fetchBookings=async()=>{
            setState(false)
            const uid=userId();
            const bookingData=await getBookings(uid);
            const updatedBooking=bookings(bookingData.data)
            console.log(updatedBooking);
            
            setBookings(updatedBooking)
            setState(true)
        }
        fetchBookings()
    },[updatePayment])

    const handlePayment=async(bookingId)=>{

        const update=await Payment(bookingId)
        if (update.data.success) {
            setUpdatePayment(!updatePayment)
            alert("Payment Sucessfull")
        }
        console.log(update);
        
    }

    
    
  return (
    <div className='py-28 md:pb-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left'/>

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
            <div className='w-1/3'>Hotels</div>
            <div className='w-1/3'>Date & Timing</div>
            <div className='w-1/3'>Payment</div>
        </div>
        { 
          state ? (
            Bookings.map((booking)=>(
                <div key={booking.bookingId} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                    {/* hotel Details */}
                    <div>
                        <img src={booking.images[Math.floor(Math.random()*4)]} alt="hotel img" className='min-md:w-44 rounded shadow object-cover' />
                        <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4 mt-3'>
                            <p className='text-2xl'>{booking.hotel.hotel} 
                                <span className='text-sm'>     ({booking.room.roomType}) </span>
                            </p>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.locationIcon} alt="location0-icon" />
                            <span>{booking.hotel.address}</span>
                        </div>
                         <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.guestsIcon} alt="guest-icon" />
                            <span className='space-x-1'>Guests {booking.bookInput.guests} </span>
                        </div>
                        <p className='text-sm'>Total : ${booking.room.price}</p>
                    </div>

                    {/* Date and time */}
                    <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                        <div>
                            <p className=''>Check-In</p>
                            <p className='text-gray-500 text-sm'>
                                {
                                    new Date(booking.bookInput.checkIn).toDateString()
                                }
                            </p>
                        </div>
                         <div>
                            <p className=''>Check-Out</p>
                            <p className='text-gray-500 text-sm'>
                                {
                                    new Date(booking.bookInput.checkOut).toDateString()
                                }
                            </p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className='flex flex-col items-start justify-center pt-3'>
                        <div className='flex items-center gap-2'>
                            <div className={`h-3 w-3 rounded-full ${booking.bookInput.paid ? 'bg-green-500':'bg-red-500'}`}></div>
                            <p className={`text-sm ${booking.bookInput.paid ? 'text-green-500':'text-red-500'}`}>
                                {booking.bookInput.paid ? 'Paid':"Unpaid"}
                            </p>

                        </div>
                        {
                            !booking.bookInput.paid && (
                                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{handlePayment(booking.bookingId)}}>
                                    Pay Now
                                </button>
                            )
                        }
 
                    </div>
                </div>
            ))

        )
        :
        (
        <Loader/>
        )
        }
       
      </div>
    </div>
  )
}

export default MyBookings
