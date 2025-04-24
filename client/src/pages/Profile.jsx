import React, { useEffect, useRef , useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { updateUserStart,updateUserSuccess,updateUserFailure,
  deleteUserStart,deleteUserSuccess,deleteUserFailure,
  signOutSuccess,signOutFailure,signOutStart} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
 
function Profile(){
    const {currUser,loading,error} = useSelector(state=>state.user)
      const fileRef = useRef(null);
      const [file,setFile] = useState(null);
      const [formData,setFormData] = useState({})
      const [profile,setProfile] = useState(currUser.user.avatar);
      const[fileUploadError,setFileUploadError] = useState(null);
      const [uploadStart,setUploadStart] = useState(null);
      const dispatch = useDispatch();
      const MAX_FILE_SIZE = 3 * 1024 * 1024; 
      const uploadImage = async()=>{
        if(!file) return;
        
        if(file.size>MAX_FILE_SIZE){
          setFileUploadError(true)
          return;
        }
        const formData = new FormData()
        formData.append("avatar",file);
        try {
          setUploadStart(true);
            const res = await fetch('/api/user/uploadProfileImage', {
              method: "POST",
              body: formData,
            });
    
            const data = await res.json();
          
            setFormData((prev) => ({ ...prev, avatar: data.imageUrl }));
            setProfile(data.imageUrl)
            setFileUploadError(false);
            setUploadStart(false);
          
          } catch (error) {
           setFileUploadError(true);
          }
      }
       useEffect(()=>{
          uploadImage();
       },[file])
       
       const handleChange = (e)=>{
         setFormData({...formData,[e.target.id]:e.target.value})
        
      }

      useEffect(()=>{
        if(!uploadStart && fileUploadError===false){
           const timer = setTimeout(()=>{
            setFileUploadError(null);
           },4000)

            return ()=>clearTimeout(timer);
        }   
       
      },[fileUploadError,uploadStart])

      const handleSubmit = async(e)=>{
        
        e.preventDefault();
        
        try{
          dispatch(updateUserStart());
          const res = await fetch(`/api/user/update/${currUser.user._id}`,{
            method: 'POST',
            headers : {
              'Content-type' : 'application/json'
            },
            body : JSON.stringify(formData)
          })
            const data = await res.json();
           
            if(!data.success){
              dispatch(updateUserFailure(data.message));
              return ;
            }
           
            dispatch(updateUserSuccess(data))

        } catch(error){
          dispatch(updateUserFailure(error.message));
        }
      }

      const handleDeleteUser = async() =>{
       
        try{
           dispatch(deleteUserStart())
           const res = await fetch(`/api/user/delete/${currUser.user._id}`,{
            method : "DELETE"
           })
           const data = await res.json();
           if(!data.success){
              dispatch(deleteUserFailure(data.message));
               return;
           }
          
           dispatch(deleteUserSuccess())

           
        } catch(error){
         
           dispatch(deleteUserFailure(error.message));
        }
      } 

      const handleSignOut = async()=>{
        try{
           dispatch(signOutStart());
           const res = await fetch('/api/auth/signout')
           const data = await res.json();
           if(!data.success){
            dispatch(signOutFailure(data.message));
            return;
           }
           dispatch(signOutSuccess());
        } catch(error){
            dispatch(signOutFailure(error.messsage));
        }
      }
 
     return (
        <>
        <div className="p-3 max-w-lg mx-auto mt-7">
            <h1 className="mt-3 text-3xl font-bold text-center">Profile</h1>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                <input type="file"
                 ref={fileRef}
                  hidden
                   accept="image/*"
                   onChange={(e) => setFile(e.target.files[0])}
             />
                
                <img src={profile}
                onClick={()=>fileRef.current.click()}
                 alt=""
                  className="rounded-full w-24 h-24 self-center object-cover cursor-pointer "
                  />
                  <p className="text-sm self-center">{fileUploadError? 
                  (
                    <span className = "text-red-700">Error Image upload image must be less than 3mb</span>
                  ) : uploadStart ?  (
                  <span className="text-blue-700">Uploading... Please wait.</span> 
                  ) : fileUploadError===false ? (<span className="text-green-700">Image uploaded successfully</span>
                  ) : null }</p>
                <input 
                type="text"
                placeholder="username" 
                id="username"
                defaultValue={currUser.user.username}
                className=" p-3 bg-white  rounded-lg outline-blue-500"
                onChange={handleChange}
                 />
                <input 
                type="email" 
                placeholder="email"
                id="email"
                defaultValue= {currUser.user.email}
                className=" p-3 bg-white  rounded-lg outline-blue-500"
                onChange={handleChange}
                />

                <input  
                type="password"
                 placeholder="password"
                 id="password"
                 className=" p-3 bg-white  rounded-lg outline-blue-500"
                 onChange={handleChange}
                  />
                
               <button disabled={loading} className="bg-slate-700 uppercase p-3 font-semibold text-white rounded-lg
                hover:opacity-90 disabled:opacity-75">{loading ? 'Loading..' : 'Update'}</button>
                <Link to={'/create-listing'} 
                  className="bg-green-700 uppercase p-3 font-semibold text-white rounded-lg
                hover:opacity-90 disabled:opacity-75 text-center"
                  >Create Listing</Link>
              </form>
              <div className="flex justify-between mt-5">
                <span 
                className = "text-red-700 cursor-pointer font-semibold" 
                onClick={handleDeleteUser}>Delete Account</span>
                <span
                 className = "text-red-700 cursor-pointer font-semibold"
                 onClick={handleSignOut}
                 >Sign Out</span>
              </div>

              
            
        </div>
        </>
    )
}

export default Profile;