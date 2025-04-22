import React, { useEffect, useRef , useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure, signInFailure, signInSuccess } from "../redux/user/userSlice";

 
function Profile(){
    const {currUser} = useSelector(state=>state.user)
      const fileRef = useRef(null);
      const [file,setFile] = useState(null);
      const [formData,setFormData] = useState({})
      const [profile,setProfile] = useState(currUser.user.avatar);
      const dispatch = useDispatch();
      
      const uploadImage = async()=>{
        if(!file) return;

        const formData = new FormData()
        formData.append("avatar",file);
        try {
            const res = await fetch('/api/user/uploadProfileImage', {
              method: "POST",
              body: formData,
            });
    
            const data = await res.json();
           console.log("Uploaded image URL:", data.imageUrl);

          
            setFormData((prev) => ({ ...prev, avatar: data.imageUrl }));
            setProfile(data.imageUrl)
          
          } catch (err) {
            console.error("Image upload failed", err);
          }
      }
       useEffect(()=>{
          uploadImage();
       },[file])
       
       const handleChange = (e)=>{
         setFormData({...formData,[e.target.id]:e.target.value})
        
      }

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
              console.log('error inside')
              dispatch(updateUserFailure(data.message));
              return ;
            }
           
            dispatch(updateUserSuccess(data))

        } catch(error){
          dispatch(updateUserFailure(error.message));
        }
      }

      const handleDeleteUser = async() =>{
        console.log('hello')
        try{
           dispatch(deleteUserStart())
           const res = await fetch(`/api/user/delete/${currUser.user._id}`,{
            method : "DELETE"
           })
           const data = await res.json();
           if(!data.success){
             console.log('haanji')
              dispatch(deleteUserFailure(data.message));
              // console.log(res.message);
               return;
           }
           console.log(res);
           dispatch(deleteUserSuccess())
           
           
        } catch(error){
          console.log(error.message);
           dispatch(deleteUserFailure(error.message));
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
                {/* <img src={currUser.rest.avatar} */}
                <img src={profile}
                onClick={()=>fileRef.current.click()}
                 alt=""
                  className="rounded-full w-24 h-24 self-center object-cover cursor-pointer "
                  />
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

               <button className="bg-slate-700 uppercase p-3 font-semibold text-white rounded-lg
                hover:opacity-90">Update</button>
              </form>
              <div className="flex justify-between mt-5">
                <span className = "text-red-700 cursor-pointer font-semibold" onClick={handleDeleteUser}>Delete Account</span>
                <span className = "text-red-700 cursor-pointer font-semibold">Sign Out</span>
              </div>

              
            
        </div>
        </>
    )
}

export default Profile;