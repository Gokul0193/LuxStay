import React, { useState } from 'react'
import google from '../assets/google.png'
import { assets } from '../assets/assets'
import Signup from './Signup';
import { loginWithEmail,loginWithGoogle } from '../controller/authController';

const Login = ({onlogin}) => {
    const [islogin,setIslogin]=useState(true)
    const [isclose,setIsclose]=useState(true)
    const [form,setForm]=useState({email:'',password:''})

    const handleEmailLogin= async(e)=>{
      e.preventDefault();
      try {
          const userData=await loginWithEmail(form.email,form.password);
          
          
          
          onlogin();
          alert(`Welcome back ${userData.name}, role: ${userData.role}`);
         

          
      } catch (error) {
        alert("Login failed or no such account.");
      }
    }

    const handleGoogleLogin=async()=>{
      try {
        const userData= await loginWithGoogle();
     
        onlogin();
        alert(`Welcome ${userData[0].user.name}, role: ${userData[0].user.role}`);
         console.log("Login Data",userData);
         console.log("local ",localStorage.getItem('user'));
         
          


      } catch (error) {
        alert("No such account with this Google email. Please sign up first.");
      }
    }

  return  isclose &&(
    <div>
     {(islogin) && <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70 '>
            <div className='flex bg-white rounded-xl w-lg md:h-[600px] h-[500px] max-md:mx-2  flex-col items-center justify-center gap-3 py-5 relative'>
              <div className='absolute top-4 right-4 h-4 '>
                <img src={assets.closeIcon} alt="close icon" className='  w-4 cursor-pointer' onClick={()=>setIsclose(!isclose)}/>
            </div>
          
            <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
            <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

            <button onClick={handleGoogleLogin} className='md:w-96  w-40 md:mt-8 bg-gray-500/10 flex items-center justify-center md: h-12 py-3 rounded-full gap-5 cursor-pointer'><img src={google} alt="googlogo" className='w-7 h-auto' /><p>Google</p></button>

            <form onSubmit={handleEmailLogin} >
            
        
           

             <div className="flex items-center gap-4 justify-center w-full my-5">
                <div className="w-full h-px hidden md:block bg-gray-300/90"></div>
                <p className="w-full text-nowrap text-sm text-center text-gray-500/90">or sign in with email</p>
                <div className="w-full  hidden md:block h-px bg-gray-300/90"></div>
            </div>

            <div className=' flex flex-col items-center justify-center'>
                 <input type="email" value={form.email} onChange={(e)=>{
                  setForm({...form,email:e.target.value})
                 }} placeholder="Email id" className=" text-gray-500/80 placeholder-gray-500/80 outline-none pl-8 md:w-96 h-12 w-72 rounded-full  bg-transparent border border-gray-400 text-lg mb-3" required/>      

            <input type="password" value={form.password} onChange={(e)=>{
                  setForm({...form,password:e.target.value})
                 }} placeholder="Password" className=" text-gray-500/80 placeholder-gray-500/80 outline-none pl-8 md:w-96 h-12 w-72 rounded-full  bg-transparent border border-gray-400 text-lg" required/>  

              <button type="submit" className="mt-8 md:w-96 h-12 w-72 rounded-full text-white bg-primary hover:opacity-90 transition-opacity bg-blue-500">
                Login
            </button> 


            <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <a className="text-indigo-400 cursor-pointer" onClick={()=>setIslogin(!islogin)} >Sign up</a></p>
            </div>
            

             
        </form>
            </div>
        

    </div>
    }
    {
        !islogin &&<Signup onlogin={onlogin} />
    }
    </div>
  )
}

export default Login
