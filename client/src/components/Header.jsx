import React from "react";
import {FaSearch} from 'react-icons/fa'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function Header(){
    const {currUser} = useSelector(state=>state.user);
    const [searchTerm,setSearchTerm] = useState('');
    const navigate = useNavigate();
     const location = useLocation()
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
       navigate(`/search?${searchQuery}`)
    }

     useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    
      setSearchTerm(searchTermFromUrl || '');
    
  }, [location.search]);

    return(
        <header className='bg-slate-200'>
            <div className = "flex flex-col  gap-3 sm:flex-row justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/'>
            <h1 className="font-bold text-xl">
                <span className="text-slate-500">Home</span>
                <span className="text-slate-700">Scape</span>
            </h1>
            </Link>
            <form  onSubmit={handleSubmit}
              className="bg-slate-100 p-2 sm:p-3 rounded-xl items-center">
                <input type="text"
                 placeholder="Search..."
                 className=" outline-none  w-44 sm:w-64 bg-transparent "
                 value={searchTerm}
                 onChange={(e)=>setSearchTerm(e.target.value)}
                 />
                <button className="cursor-pointer">
                    <FaSearch className = "text-slate-700"/>
                </button>
            </form>
            <ul className="flex  gap-6 sm:gap-4 ">
                <Link to='/'>
                <li className="text-slate-700 hover:underline font-semibold">Home</li>
                </Link>
                <Link to='/About'>
                <li className="text-slate-700 hover:underline font-semibold">About</li>
                </Link>
                
               <Link to='/profile' >{ currUser ?
    
                    <img className ="rounded-full w-7 h-7" src={currUser.user.avatar || 'https://cdn-icons-png.flaticon.com/512/8608/8608769.png'} alt="profile" />
                :
               <li className=' text-slate-700 hover:underline font-semibold'> Sign in</li>
}
                    </Link>
            </ul>
            <button>
                
            </button>
            </div>
        </header>
    )
}

export default Header