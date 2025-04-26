import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 function CreateListing(){
        const [file,setFile] = useState([]);
        const {currUser} = useSelector(state=>state.user)
        const [imageUploadError,setImageUploadError] = useState(false);
        const [upload,setUpload] = useState(false)
        const [error,setError] = useState(null)
        const [loading,setLoading] = useState(false)
        const [formData,setFormData] = useState({
            imageUrls : [],
            name : '',
            description : '',
            address : '',
            type : 'rent',
            bedrooms : 1,
            bathrooms : 1,
            regularPrice : 50,
            discountPrice : 0,
             offer : false,
             parking : false,
             furnished : false,
             userRef:"hi"
        })
        
        const navigate = useNavigate()
        const handleImageSubmit = async()=>{
             setUpload(true)
              const newUrls=[]
             
            for(let idx=0;idx<file.length;idx++){
                 const formData = new FormData();
                 formData.append('image',file[idx]);
                 
                 try{
                   
                   const res = await fetch('/api/upload/image',{
                    method:'POST',
                    body:formData
                   })
                   const data = await res.json();
                   
                   newUrls.push(data.imageUrl)
                   setImageUploadError(false)
                   
                 } catch(error){
                     setImageUploadError(true)
                     console.error('Error uploading image:', error.message);
                     break
                 }
            }
             
            setFormData({...formData,imageUrls:[...formData.imageUrls,...newUrls]})
             setUpload(false)
        }

        // useEffect(() => {
        //     console.log('Upload changed to:', upload);
        //   }, [upload]);
        const handleRemoveImage = (index)=>{
            const updatedUrls = formData.imageUrls.filter((_,idx)=>idx!=index);
            setFormData({...formData,imageUrls:updatedUrls})
        }
        const handleChange = (e)=>{
              if(e.target.id==='sell' || e.target.id==='rent'){
                setFormData({...formData,type:e.target.id})
              }

              if(e.target.id === 'parking' || e.target.id==='furnished' || e.target.id==='offer'){
                   setFormData({...formData,[e.target.id]:e.target.checked})
              }

              if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea'){
                setFormData({...formData,[e.target.id] : e.target.value})
              }
        }
        // console.log(formData);

        const handleSubmit = async(e)=>{
             e.preventDefault();
             try{
                if(formData.imageUrls.length<1) 
                    return setError('You must upload atleast one image')

                if(formData.regularPrice<formData.discountPrice)
                    return setError('Discount price should be lower than regular price')

                setLoading(true)
                setError(false)

                const res = await  fetch('/api/listing/create',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      
                    body : JSON.stringify({
                        ...formData,
                        userRef : currUser.user._id
                    })
                })
                 setLoading(false)
                 const data=await res.json();
                 console.log(data,"he")
                 navigate(`/listing/${data._id}`)
             }catch(error){
                 setError('error')
                 console.log('error inside',error.message)
                 setLoading(false)
             }
        }
    return (
        <main className="max-w-4xl mx-auto p-3">
            <h1  className="text-center text-3xl font-bold my-7">Create a Listing</h1>
             <form onSubmit={handleSubmit}  className="flex flex-col sm:flex-row gap-4" >
                <div className="flex flex-col gap-4 flex-1">
                    <input 
                    type="text" 
                    id='name'
                     placeholder='Name' 
                    className="p-3   bg-white rounded-lg"
                    maxLength='50'
                    minLength='8'
                    onChange={handleChange}
                    value={formData.name}
                     required/>

                    <textarea 
                    type="text" 
                    id='description' 
                    placeholder='Description'
                    className="p-3  bg-white rounded-lg"
                     onChange={handleChange}
                     value={formData.description}
                      required/>

                    <input type="text"
                     id='address' 
                     placeholder='Address'
                    className="p-3 
                     bg-white rounded-lg"
                     onChange={handleChange}
                     value={formData.address}  
                     required/>

                    <div className='flex gap-6  flex-wrap'>
                       <div className="flex gap-2">
                      <input type="checkbox" id="sell" className="w-5" 
                      onChange={handleChange} checked={formData.type==='sell'}/>
                      <label htmlFor="sell" className=" text-md font-semibold">Sell</label>
                      </div>

                      <div className="flex gap-2">
                      <input type="checkbox" id="rent" className="w-5"
                      onChange={handleChange} checked={formData.type==='rent'}/>
                      <label htmlFor="rent" className=" text-md font-semibold">Rent</label>
                      </div>

                      <div className="flex gap-2">
                      <input type="checkbox" id="parking" className="w-5"
                      onChange={handleChange} checked={formData.parking}/>
                      <label htmlFor="parking" className=" text-md font-semibold">Parking Spot</label>
                      </div>

                      <div className="flex gap-2">
                      <input type="checkbox" id="furnished" className="w-5"
                       onChange={handleChange} checked={formData.furnished}/>
                      <label htmlFor="furnished" className=" text-md font-semibold">Furnished</label>
                      </div>

                      <div className="flex gap-2">
                      <input type="checkbox" id="offer" className="w-5"
                       onChange={handleChange} checked={formData.offer}/>
                      <label htmlFor="offer" className=" text-md font-semibold">Offer</label>
                      </div>
                    </div>

                    <div className="flex gap-8 flex-wrap">
                        <div className="flex items-center gap-2">
                            <input 
                            type="number"
                             min='1' max='10' 
                              id="bedrooms"
                             className="p-3 border border-gray-300 rounded-lg bg-white" 
                            required
                            onChange={handleChange}
                            value={formData.bedrooms}
                            />
                            <label htmlFor="bedrooms" className=" text-md font-semibold">Beds</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                             type="number" 
                             min='1' 
                             max='10' 
                              id="bathrooms"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                            required
                            onChange={handleChange}
                            value={formData.bathrooms}
                            />
                            <label htmlFor="bathrooms" className=" text-md font-semibold">Baths</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                            type="number"
                             min='50'
                              max='100000' 
                               id="regularPrice"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                            required
                            
                            onChange={handleChange}
                            value={formData.regularPrice}
                            />
                            <label htmlFor="regularPrice" className=" text-md font-semibold">
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </label>
                        </div>

                        {formData.offer && (<div className="flex items-center gap-2">
                            <input 
                            type="number" 
                            min='1' 
                            max='10' 
                             id="discountPrice"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                             onChange={handleChange}
                             value={formData.discountPrice}
                            required/>
                            <label htmlFor="discountPrice" className=" text-md font-semibold">
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / Month)</span>
                            </label>
                        </div>
                         ) }
                    </div>

                </div>
                <div className='flex flex-col  flex-1 gap-4 '>
                   <p className="font-semibold">Images:
                    <span className="font-normal text-gray-700 ml-2">The first image will be the cover (max 6)</span>
                   </p>
                
                <div className="flex gap-4">
                    <input type="file" id="images" accept='image/*' multiple 
                    className="p-3 border border-gray-300 rounded w-full"
                    onChange={(e)=>setFile(e.target.files)}
                    />
                    

                    <button 
                    className="text-green-700 border-2 font-semibold border-green-700 p-3 "
                     onClick={handleImageSubmit}
                    >upload</button>
                </div>
                 {formData.imageUrls.length>0 && formData.imageUrls.map((url,idx)=>(
                           <div key={url} className='flex justify-between'>
                              <img src={url} 
                               className='w-20 h-20 object-contain rounded-lg'
                                />
                              <button
                              type="button"
                              onClick={()=>handleRemoveImage(idx)}
                              className="p-2 bg-red-700 text-white  rounded-lg uppercase hover:opacity-75 font-semibold"
                              >Delete</button>
                           </div>
                 )
                )
                 } 
                 <p className='text-red-700'>{imageUploadError ? 'Image should be less than 2mb':null}</p>
                 
                <button  disabled={upload || loading}
                className="my-4 p-3 bg-slate-700  text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-55">
                    {loading ? 'Creating...' : 'Create Listing'}</button>

                    <p className="text-red-700">{error}</p>
                </div>
               
                
             </form>
        </main>
    )
}

export default CreateListing