import React, { useEffect, useState } from 'react'
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Login from './Login';
import HotelReg from './HotelReg';
import {userData} from '../common/userDetails.js'


const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];


    const [user,setUser]=useState(userData());
    const islogout=!user;
    const isowner=user?.role==='Hotel Owner';
    const isRegistered=user?.isHotelRegistered


 
    
    

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showHotelReg,setHotelReg]=useState(false);
    const [showLogin,setShowLogin]=useState(false)

    const navigate=useNavigate();
    const location=useLocation();
    
    useEffect(()=>{
        if (isowner&& !isRegistered) {
            setHotelReg(true)
        }
    },[isowner,isRegistered])



    useEffect(() => {

        if (location.pathname !=='/') {
            setIsScrolled(true);
            return;
        }else{
            setIsScrolled(false)
        }

        setIsScrolled(prev=>location.pathname !=='/' ?true:prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
       window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);


    const handleLogout=()=>{
     
    alert(`${user.name} is Logout Sucessfully`)
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    

    setUser(null)
   };
    
   
   const handleLoginFinish=()=>{
    setUser(userData());
    setShowLogin(false);
   };

   const handleHotelRegistered=()=>{
    setHotelReg(false);
    setUser(userData())
   };

   const handleDashboardClick=()=>{
    if(isRegistered){
        
        navigate('/owner')
    }else{
        setHotelReg(true);
    }
   };

    

  
   

    return (
        <>
       
            
            <nav className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? " bg-[#0B5844]  shadow-md text-white backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to='/' className="flex items-center  gap-2">
                    <img src={assets.logo} alt="logo" className={`h-9 `} /> <span className='text-[#FAF9F6] text-3xl font-bold'>LuxStay</span> 
                </Link>
 
                {/* Desktop Nav */}
                {
                    isowner ? (
                             <div className="hidden md:flex items-center  gap-4 lg:gap-8">
                    {!isowner&&navLinks.map((link, i) => (
                        <Link key={i} to={link.path} className={`group flex  flex-col gap-0.5 ${isScrolled ? "text-white" : "text-gray-700"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </Link>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-white' : 'text-black'} transition-all`} onClick={handleDashboardClick}>
                        Dashboard
                    </button>
                </div>
                    )

                    :

                    (
                         <div className="hidden md:flex items-center  gap-4 lg:gap-8">
                    {!isowner&&navLinks.map((link, i) => (
                        <Link key={i} to={link.path} className={`group flex  flex-col gap-0.5 ${isScrolled ? "text-white" : "text-gray-700"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </Link>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-white' : 'text-black'} transition-all`} onClick={()=>{
                                    navigate('/mybooking')
                                }}>
                        My Bookings
                    </button>
                </div>
                    )
                }
               

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={assets.searchIcon} alt="serach" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />

                    {
                        // user?
                        // // (<UserButton>
                        // //     <UserButton.MenuItems>
                        // //         <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=>{
                        // //             navigate('/mybooking')
                        // //         }}/>
                        // //     </UserButton.MenuItems>
                        // // </UserButton>)
                        // :
                        
                    }
                   {
                    islogout ? (
                             <button className="bg-[#c18D52] text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer" onClick={()=>{setShowLogin(true);}} >
                        Login
                    </button>
                    ) :(
                              <button className="bg-[#c18D52] text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer" onClick={()=>{handleLogout();navigate('/')}} >
                        Logout
                    </button>
                    )
                   }
                   
                  
                </div>

                {/* Mobile Menu Button */}
            
                <div className="flex items-center gap-8 md:hidden">
                        {/* {
                    user &&  <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=>{
                                    navigate('/mybooking')
                                }}/>
                            </UserButton.MenuItems>
                        </UserButton>
                } */}
                    <img onClick={()=>{
                        setIsMenuOpen(!isMenuOpen)
                    }} src={assets.menuIcon} alt="menuicon" className={` h-4`} />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() =>setIsMenuOpen(false)}>
                       <img src={assets.closeIcon} alt="close" className=' h-6.5' />
                    </button>

                    {
                         
                    
                    navLinks.map((link, i) => (
                        <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </Link>
                    ))}

                    {
                         isowner ? (
                         <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={()=>{
                                    setIsMenuOpen(false);
                                    handleDashboardClick();
                                }}>
                        Dashboard
                    </button>
                         )
                         :
                         (
                            <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={()=>{
                                    navigate('/mybooking');
                                    setIsMenuOpen(false);
                                }}>
                        My Bookings
                    </button>
                         )
                    }
                   


                    {
                       islogout ?( 
                         <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer" onClick={()=>{
                            setIsMenuOpen(false);
                            setShowLogin(true)
                         }}>
                        Login
                    </button>
                    ) 
                    :
                    (
                          <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer" onClick={()=>{handleLogout(); navigate('/')}}>
                        Log out
                    </button>
                    )
                    }
             
                   
                </div>
             

                        
            </nav>
               {showLogin && (
  
    <Login onlogin={handleLoginFinish} />
 
  
)}

     {showHotelReg && (
  
    <HotelReg onClose={()=>setHotelReg(false)} onRegisterComplete={()=>handleHotelRegistered()} />
 
  
)}
     </>
    );
}

export default Navbar
