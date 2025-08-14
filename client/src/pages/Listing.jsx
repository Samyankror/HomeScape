import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import {useSelector} from 'react-redux'
import Contact from '../components/Contact';


function Listing(){
    SwiperCore.use([Navigation]);
const [listing,setListing] = useState(null);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(false);
 const params = useParams();
 const  {currUser} = useSelector(state=>state.user);
 const [contact,setContact] = useState(false);
 
useEffect(()=>{
    const fetchListing = async()=>{
     try{
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json();

        if(!data.success){
            setError(true);
            setLoading(false);
            return;
        }
        setListing(data.listing);
        setLoading(false);
     
        
     } catch(error){
        setError(true);
        setLoading(true);
       
     }
    }
    fetchListing();
},[params.listingId])


    return (
         <main>
           {loading && <p>Loading...</p>}
           {error && <p>Something went wrong!</p>}
           {listing && !loading && !error && (
             <div>
                 <Swiper navigation>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                        <img src={url} alt="" className='w-full h-[550px] object-cover'/>
                        </SwiperSlide>
                    ))}
                 </Swiper>

                 <div className="flex flex-col max-w-4xl mx-auto gap-4 p-3 my-7">
                    <p className="text-2xl font-semibold">{listing.name} - ${' '}
                        {listing.regularPrice.toLocaleString('en-Us')}
                        {listing.type==='rent' && ' / month'}
                    </p>
                    <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                        <FaMapMarkedAlt className="text-green-700" />
                        {listing.address}
                    </p>
                     <div className="flex gap-4">
                        <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            {listing.type==='rent'? 'For Rent' : 'For Sale'}
                        </p>
                        <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            ${listing.discountPrice} OFF
                        </p>
                     </div>

                    <p className="text-slate-800">
                        <span className="text-black font-semibold">Description : </span>
                        {listing.description}
                    </p>
                    <ul className='flex flex-wrap text-green-900 font-semibold text-sm items-center gap-4 sm:gap-6'>
                        <li className='flex items-center gap-1 whitespace-nowrap'>
                         <FaBed className='text-lg' />
                           {listing.bedrooms > 1  
                           ? `${listing.bedrooms} beds` 
                        : `${listing.bedrooms} bed`}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap'>
                         <FaBath className="text-lg"/>
                           {listing.bathrooms > 1  
                           ? `${listing.bathrooms} beds` 
                        : `${listing.bathrooms} bed`}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap'>
                            <FaParking className='text-lg' />
                           {listing.parking   
                           ? 'Parking': 'No Parking'}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                      </li>
                    </ul>

                     {currUser && listing.userRef!==currUser.user._id && !contact &&
                      <button  onClick={()=>setContact((prev)=>!prev)}
                      className='bg-slate-700 p-3 text-white text-xl font-semibold rounded-lg
                       uppercase hover:opacity-90 cursor-pointer'>contact landlord</button>
                     }

                     {contact && <Contact listing={listing}/>}
                 </div>
             </div>
             
           )}
         </main>
    )
}

export default Listing;