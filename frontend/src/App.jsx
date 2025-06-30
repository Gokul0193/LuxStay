import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './components/RoomDetails'
import MyBookings from './pages/MyBookings'

import Layout from './pages/hotelowner/Layout'
import Dashboard from './pages/hotelowner/Dashboard'
import AddRoom from './pages/hotelowner/AddRoom'
import ListRoom from './pages/hotelowner/ListRoom'



function App() {
  // const isowner = useLocation().pathname.includes('owner')

 
  


  return (
    <div>
      {true && <Navbar />}
     
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/mybooking' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-room' element={<AddRoom/>}/>
            <Route path='list-room' element={<ListRoom/>}/>
          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
