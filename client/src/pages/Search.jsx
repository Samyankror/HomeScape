
function Search(){
    return (
        
        <div className='flex'>
            <div className='border-r-2 min-h-screen p-7'>
                <form action="" className='flex flex-col gap-8'>
                      <div className='flex items-center gap-2'>
                    <label htmlFor="searchTerm" className='font-semibold'>Search Term:</label>
                    <input 
                    type="text" 
                     id="searchTerm"
                     placeholder="Search..."
                     className='p-3 bg-white rounded-md '/>
                     </div>
                     <div className="flex gap-2  items-center flex-wrap">
                        <label className='font-semibold'>Type:</label>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='rent&sale' className='w-5 h-5' />
                             <label htmlFor="rent&sale" className='font-semibold'>Rent&Sale</label>
                        </div>
                        <div className='flex items-center gap-1'>
                           
                            <input type="checkbox" id='rent' className='w-5 h-5'/>
                             <label htmlFor="rent" className='font-semibold'>Rent</label>
                        </div>
                        <div className='flex items-center gap-1'>
                            
                            <input type="checkbox" id='sale' className='w-5 h-5'/>
                            <label htmlFor="sale" className='font-semibold'>Sale</label>
                        </div>
                        <div className='flex items-center gap-1'>
                            
                            <input type="checkbox" id='offer' className='w-5 h-5' />
                            <label htmlFor="offer" className='font-semibold'>Offer</label>
                        </div>
                    
                        
                     </div>

                     <div className='flex gap-2'>
                      
                      <label className='font-semibold'>Amenities:</label>
                       <div className='flex items-center gap-1'>
                            <input type="checkbox" id='Parking' className='w-5 h-5' />
                             <label htmlFor="Parking" className='font-semibold'>Parking</label>
                        </div>
                        <div className='flex items-center gap-1'>
                           
                            <input type="checkbox" id='Furnished' className='w-5 h-5'/>
                             <label htmlFor="Furnished" className='font-semibold'>Rent</label>
                        </div>
 
                     </div>

                     <div >
                        <label className='font-semibold p-2'>Sort:</label>
                        <select id="sort-order" className="bg-white p-2 rounded-lg">
                            <option >Price high to Low</option>
                            <option value=''>Price low to high</option>
                            <option value=''>Latest</option>
                            <option value=''>Oldest</option> 
                        </select>
                     </div> 

                     <button className='p-3 bg-slate-700  cursor-pointer font-semibold
                     text-white rounded-lg hover:opacity-90'>Search</button>
                </form>
            </div>

            <div>
                <h1 className='text-3xl font-semibold p-4'>Listing results:</h1>
            </div>
        </div>
        
    )
}

export default Search;