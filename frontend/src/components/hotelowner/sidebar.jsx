import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const sidebarLink=[
        {
            name:"Dashboard",
            path:'/owner',
            icon:assets.dashboardIcon
        },
         {
            name:"Add Room",
            path:'/owner/add-room',
            icon:assets.addIcon
        },
         {
            name:"List Roo,",
            path:'/owner/list-room',
            icon:assets.listIcon
        },
    ]
  return (
    <div className='border-r border-gray-300 pt-2 h-screen mb-10'>
      {
        sidebarLink.map((items,index)=>{
            return <NavLink to={items.path} key={index} end className={({isActive})=>`flex mt-2 items-center py-3 px-4 md:px-8 gap-3 ${isActive ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 textblue-600' : 'hover:bg-gray-100/90 border-white text-gray-700'} `}>
                <img src={items.icon} alt={items.name} className='min-h-6 min-w-6' />
                <p className='md:block hidden text-center'>{items.name}</p>
            </NavLink>
        })
      }
    </div>
  )
}

export default Sidebar
