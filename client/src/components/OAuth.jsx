
import React from "react";
import {GoogleAuthProvider, getAuth,signInWithPopup} from 'firebase/auth'
import { app } from "../firebase.js";
import {useDispatch} from 'react-redux'
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";


function OAuth(){
      const dispatch = useDispatch()
      const navigate = useNavigate()
    const handleGoogleAuth = async()=>{
   try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      console.log(result);
      const res = await fetch('/api/auth/google',{
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({name: result.user.displayName, email : result.user.email,photo:result.user.photoURL})
      })

      
      const data = await res.json();
     
      dispatch(signInSuccess(data))
      navigate('/')
      
   }catch(error){
    console.log('could not sign in with google',error)
   }
    }
    return(
        <button  type = 'button'
        className = 'text-white bg-red-700 p-3 rounded-lg font-semibold uppercase hover:opacity-90 cursor-pointer'
        onClick={handleGoogleAuth}>
            continue with google
        </button>
    )
}

export default OAuth;