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
      const [userListings,setUserListings] = useState([]);
      const [showListingError,setShowListingError] = useState(false);
      const dispatch = useDispatch();
      const MAX_FILE_SIZE = 3 * 1024 * 1024; 
      const uploadImage = async()=>{
        if(!file) return;
        
        if(file.size>MAX_FILE_SIZE){
          setFileUploadError(true)
          return;
        }
        const formData = new FormData()
        formData.append("image",file);
        try {
          setUploadStart(true);
            const res = await fetch('/api/upload/image', {
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

      const handleShowListing = async()=>{
          try{
            setShowListingError(false)
            const res = await fetch(`/api/user/listings/${currUser.user._id}`)
            const data = await res.json();
            if(!data.success){
              console.log("helo")
              setShowListingError(true);
              return;
            }
            setUserListings(data.listings);
          }catch(error){
            setShowListingError(true)
          }
      }
      const handleDeleteListing = async(listingId)=>{
          try{
             const res = await fetch(`/api/listing/delete/${listingId}`,{
              method: 'DELETE',
            })
            const data = await res.json();
             if(!data.success){
              console.log(data.message)
              return;
             }

             setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId))
          } catch(error){

          }
      }
        console.log(userListings)
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
                hover:opacity-90 disabled:opacity-75 cursor-pointer">{loading ? 'Loading..' : 'Update'}</button>
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

              <button onClick={handleShowListing}
               className='text-green-700 mt-5 w-full cursor-pointer'>Show Listing</button>
                
                <p className='text-red-700 mt-5'>
                  {showListingError ?  'Error showing listings' : ''}</p>

                { userListings && userListings.length>0 &&  (
                  <div className="flex flex-col gap-4">
                    <h1 className='text-center mt-7 text-2xl font-semibold'
                     >User Listing</h1>

                    {userListings.map((listing)=>(
                       <div key={listing._id} className="flex gap-4">
                        <Link to={`/listing/${listing._id}`}>
                        <img src={listing.imageUrls[0]} 
                        alt='listing cover'
                        className='h-16 w-16 object-contain' />
                        </Link>

                        <Link to={`/listing/${listing._id}`}
                         className='text-slate-700 font-semibold  hover:underline truncate flex-1 '>
                          <p>{listing.name}</p>
                        </Link>

                        <div className='flex flex-col  gap-1 items-center '>
                          <button onClick={()=>handleDeleteListing(listing._id)}
                          className='bg-red-700 text-white uppercase  px-2 py-1 rounded-lg text-xs font-semibold'>Delete</button>
                          <Link to={`/update-listing/${listing._id}`}>
                          <button  className='bg-green-700 text-white uppercase px-2 py-1 rounded-lg text-xs font-semibold'>Update</button>
                          </Link>
                        </div>
                       </div>
                    ))}
                  </div>

              )
                }
            
        </div>
        </>
    )
}

export default Profile;