import React from 'react'

 function CreateListing(){
    return (
        <main className="max-w-4xl mx-auto p-3">
            <h1  className="text-center text-3xl font-bold my-7">Create a Listing</h1>
             <form action="" className="flex flex-col sm:flex-row gap-4" >
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" id='name' placeholder='Name' 
                    className="p-3   bg-white rounded-lg" required/>
                    <input type="text" id='description' placeholder='Description'
                    className="p-3  bg-white rounded-lg" required/>
                    <input type="text" id='address' placeholder='Address'
                    className="p-3  bg-white rounded-lg"  required/>

                    <div className='flex gap-6  flex-wrap'>
                       <div className="flex gap-2">
                      <input type="checkbox" id="sell" className="w-5"/>
                      <label htmlFor="sell" className=" text-md font-semibold">Sell</label>
                      </div>
                      <div className="flex gap-2">
                      <input type="checkbox" id="rent" className="w-5"/>
                      <label htmlFor="rent" className=" text-md font-semibold">Rent</label>
                      </div>
                      <div className="flex gap-2">
                      <input type="checkbox" id="parking" className="w-5"/>
                      <label htmlFor="parking" className=" text-md font-semibold">Parking Spot</label>
                      </div>
                      <div className="flex gap-2">
                      <input type="checkbox" id="furnished" className="w-5"/>
                      <label htmlFor="furnished" className=" text-md font-semibold">Furnished</label>
                      </div>
                      <div className="flex gap-2">
                      <input type="checkbox" id="offer" className="w-5"/>
                      <label htmlFor="offer" className=" text-md font-semibold">Offer</label>
                      </div>
                    </div>
                    <div className="flex gap-8 flex-wrap">
                        <div class="flex items-center gap-2">
                            <input type="number" min='1' max='10'  id="beds"
                             className="p-3 border border-gray-300 rounded-lg bg-white  " 
                            required/>
                            <label htmlFor="beds" className=" text-md font-semibold">Beds</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="number" min='1' max='10'  id="baths"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                            required/>
                            <label htmlFor="baths" className=" text-md font-semibold">Baths</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="number" min='1' max='10'  id="regular"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                            required/>
                            <label htmlFor="regular" className=" text-md font-semibold">
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="number" min='1' max='10'  id="discount"
                             className="p-3 border border-gray-300 rounded-lg bg-white " 
                            required/>
                            <label htmlFor="discount" className=" text-md font-semibold">
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / Month)</span>
                            </label>
                        </div>
                        
                    </div>

                </div>
                <div className='flex flex-col  flex-1 gap-4 '>
                   <p className="font-semibold">Images:
                    <span className="font-normal text-gray-700 ml-2">The first image will be the cover (max 6)</span>
                   </p>
                
                <div className="flex gap-4">
                    <input type="file" id="images" accept='image/*' multiple 
                    className="p-3 border border-gray-300 rounded w-full"/>
                   

                    <button className="text-green-700 border-2 font-semibold border-green-700 p-3 " >upload</button>
                </div>
               
                <button className="my-4 p-3 bg-slate-700  text-white rounded-lg uppercase hover:opacity-90">Create Listing</button>
                </div>

                
             </form>
        </main>
    )
}

export default CreateListing