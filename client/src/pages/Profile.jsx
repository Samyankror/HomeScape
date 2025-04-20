import React from "react";
import {useSelector} from 'react-redux'

 
function Profile(){
    const {currUser} = useSelector(state=>state.user)

    return (
        <>
        <div className="p-3 max-w-lg mx-auto mt-7">
            <h1 className="mt-3 text-3xl font-bold text-center">Profile</h1>
              <form className="flex flex-col gap-4 mt-4">
                <img src={currUser.rest.avatar}
                 alt=""
                  className="rounded-full w-24 h-24 self-center object-cover cursor-pointer "
                  />
                <input 
                type="text"
                placeholder="username" 
                value={currUser.rest.username}
                className=" p-3 bg-white  rounded-lg outline-none"
                 />
                <input 
                type="email" 
                placeholder="email"
                value= {currUser.rest.email}
                className=" p-3 bg-white  rounded-lg outline-none"
                />

                <input  
                type="password"
                 placeholder="password"
                 className=" p-3 bg-white  rounded-lg outline-none" />

               <button className="bg-slate-700 uppercase p-3 font-semibold text-white rounded-lg
                hover:opacity-90">Update</button>
              </form>
              <div className="flex justify-between mt-5">
                <span className = "text-red-700 cursor-pointer font-semibold">Delete Account</span>
                <span className = "text-red-700 cursor-pointer font-semibold">Sign Out</span>
              </div>

              
            
        </div>
        </>
    )
}

export default Profile;