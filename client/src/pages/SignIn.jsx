import React from "react";
import { useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";

function SignIn(){
    const [formData,setFormData] = useState({})
   const {loading,error} = useSelector((state)=>state.user)
   const navigate = useNavigate()
    const dispatch = useDispatch()
   const handleChange = (e)=>{
    setFormData({
    ...formData,
    [e.target.id]:e.target.value,
  })
 }
 

 const handleSubmit = async(e)=>{
   e.preventDefault();
  
   try{
    dispatch(signInStart())
   const res = await fetch('api/auth/signIn',{
    method : 'POST',
    headers : {
       'Content-Type': 'application/json'
    },
    body : JSON.stringify(formData) 
   })

   const data = await res.json();

   if(!data.success){
    dispatch(signInFailure(error.message))
    return
   }
   dispatch(signInSuccess(data))
    navigate('/')
 } catch(error){
   dispatch(signInFailure(error.message))
 }
 }

    return (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
          <form  onSubmit={handleSubmit}
          className = "flex flex-col gap-5" >
             <input type="text" 
             placeholder="Email" 
             className=" p-3 bg-white  rounded-lg outline-none"
             id="email"
             onChange={handleChange}
             />
             <input 
             type="password"
             placeholder="Password"
             className=" p-3 bg-white  rounded-lg outline-none"
             id="password"
             onChange={handleChange}
            
              />
             <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg font-semibold hover:opacity-85"
             >{loading?'...loading':'SIGN In'}</button>
            
          </form>
          <div className=' flex gap-2 mt-5'>
             <p className="font-semibold">Don't have an account?</p>
             <Link to={'/sign-up'} ><span className="text-blue-700 font-semibold">Sign Up</span></Link>
          </div>
 
          <div>
             {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </div>
     )
}

export default SignIn;