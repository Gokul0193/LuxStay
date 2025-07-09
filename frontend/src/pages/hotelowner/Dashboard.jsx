import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { recentBookings } from '../../controller/hotelController'
import { userData } from '../../common/userDetails'
import Loader from '../Loader'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([])
  const [totalbooking, setTotalbooking] = useState(0)
  const [totalRevenu, setTotalRevenu] = useState(0)
  const [state, setState] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      setState(false)
      const user = userData()
      console.log(user.hotelId)

      const result = await recentBookings(user.hotelId)
      console.log(result.data)
      setDashboard(result.data)
      console.log(result.data.length)
      setTotalbooking(result.data.length)

      let total = 0
      result.data.forEach(item => {
        total += Number(item.room.price)
      })
      setTotalRevenu(total)
      setState(true)
    }

    fetchBookings()
  }, [])

  return (
    <div>
      <Title
        align='left'
        title='Dashboard'
        subTitle='Monitor your room listing, track booking and analyze revenue-all in one place. Stay update with real time insights to ensure smooth operations.'
      />

      <div className='flex gap-4 my-8'>
        {/* Total Booking */}
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <img src={assets.totalBookingIcon} alt='icons' className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Booking</p>
            <p className='text-neutral-400 text-base'>{totalbooking}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <img src={assets.totalRevenueIcon} alt='icons' className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>${totalRevenu}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>

        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
              <th className='py-3 px-4 text-gray-800 max-sm:hidden font-medium'>Room Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {
              state === true ? (
                dashboard.map((item, index) => (
                  <tr key={index}>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                      {item.user.name}
                    </td>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                      {item.room.roomType}
                    </td>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                      {item.room.price}
                    </td>
                    <td className='py-3 px-4 border-t border-gray-300 flex'>
                      <button className={`py-1 px-3 text-xs rounded-full mx-auto ${
                        item.booking.bookInput.paid
                          ? 'bg-green-200 text-green-600'
                          : 'bg-amber-200 text-yellow-600'
                      }`}>
                        {item.booking.bookInput.paid ? 'Completed' : 'Pending'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='py-6'>
                    <div className='flex justify-center'>
                      <Loader />
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Dashboard
