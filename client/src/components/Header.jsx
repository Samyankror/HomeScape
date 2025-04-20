import React from "react";
import {FaSearch} from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(){
    const {currUser} = useSelector(state=>state.user);
    return(
        <header className='bg-slate-200'>
            <div className = "flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/'>
            <h1 className="font-bold text-xl">
                <span className="text-slate-500">Sahand</span>
                <span className="text-slate-700">Estate</span>
            </h1>
            </Link>
            <form  className="bg-slate-100 p-3 rounded-xl items-center">
                <input type="text"
                 placeholder="Search..."
                 className=" outline-none w-64 bg-transparent "
                 />
                <button >
                    <FaSearch className = "text-slate-700"/>
                </button>
            </form>
            <ul className="flex gap-4 ">
                <Link to='/'>
                <li className="text-slate-700 hover:underline font-semibold">Home</li>
                </Link>
                <Link to='/About'>
                <li className="text-slate-700 hover:underline font-semibold">About</li>
                </Link>
                
               <Link to='/profile' >{ currUser ?
    
                    <img className ="rounded-full w-7 h-7" src={currUser.rest.avatar} alt="profile" />
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