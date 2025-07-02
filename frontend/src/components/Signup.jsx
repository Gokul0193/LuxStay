import React, { use } from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import google from '../assets/google.png'
import Login from './Login';
import axios from 'axios';
import {signupWithEmail} from '../controller/authController.js'


const Signup = ({onlogin}) => {
  
const [issignup,setIssignup]=useState(true);
const [isclose,setIsclose]=useState(true);
const [form,setForm]=useState({name:'',email:'',password:'',role:'',isHotelRegistered:false});

const handleSignup=async(e)=>{
  console.log(form);
  
      e.preventDefault();
  try {

    await signupWithEmail(form.name,form.email,form.password,form.role,form.isHotelRegistered);
    onlogin();
     alert("Registered successfully. Please log in.");
  
  } catch (error) {
      console.error(error);
     alert("Signup failed: " + error.message);
  }
}
  return isclose && (
   
        <div>
    {
        issignup && <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
              <form  onSubmit={handleSignup} className='flex bg-white rounded-xl w-lg md:h-[600px] h-[550px] max-md:mx-2  flex-col items-center justify-center gap-3 py-5 relative'>
                  <div className='absolute top-4 right-4 h-4'>
                      <img src={assets.closeIcon} alt="close icon" className='  w-4 cursor-pointer' onClick={()=>setIsclose(!isclose)}/>
                  </div>
                
                  <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
                  <p className="text-sm text-gray-500/90 mt-3">New here? Sign up to explore and book hotels</p>

                  <div className='flex flex-col items-center justify-center gap-5 mt-5'>
                           <input type="text" placeholder='Name' value={form.name} onChange={(e)=>{
                            setForm({...form,name:e.target.value})
                           }} className='md:w-96  pl-5 w-72 bg-gray-500/10 h-12 rounded outline-none flex items-center justify-around ' required />

                  <input type="email" placeholder='Email' value={form.email} onChange={(e)=>{
                            setForm({...form,email:e.target.value})
                           }}className='md:w-96 w-72 pl-5 bg-gray-500/10 h-12 rounded outline-none flex items-center justify-around ' required />

                  <input type="password" placeholder='Password' value={form.password} onChange={(e)=>{
                            setForm({...form,password:e.target.value})
                           }}className='md:w-96 w-72  pl-5 bg-gray-500/10 h-12 rounded outline-none flex items-center justify-around ' required />

                       <select value={form.role} onChange={(e)=>{
                            setForm({...form,role:e.target.value})
                           }}  className='md:w-96 w-72  bg-gray-500/10 h-12  text-gray-500/90 rounded outline-none flex items-center justify-around ' required>
                   <option value="" >Select Role</option>
                    <option value="user">User</option>
                    <option value="Hotel Owner">Hotel Owner</option>
                  </select>

                  <button className='md:w-96 w-72 mt-8 text-white  flex items-center justify-center h-12 py-3 rounded-full gap-5 cursor-pointer bg-blue-500'>Register</button>
                  </div>
               

             

                
      
                  <p className="text-gray-500/90 text-sm mt-4">Already have an account? <a className="text-indigo-400 cursor-pointer" onClick={()=>setIssignup(!issignup)} >Sign In</a></p>
              </form>
      
          </div>
    }
      {
        !issignup && <Login />
      }
          </div>
  
  )
}

export default Signup
