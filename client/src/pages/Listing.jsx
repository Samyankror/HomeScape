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



function Listing(){
     SwiperCore.use([Navigation]);
    const [listing,setListing] = useState(null);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(false);
 const params = useParams();
 
useEffect(()=>{
    const fetchListing = async()=>{
     try{
        console.log(params.listingId);
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
        console.log(data);
        
     } catch(error){
        setError(true);
        setLoading(true);
        console.log(error);
     }
    }
    fetchListing();
},[params.listingId])
console.log(listing);
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
                        <FaMapMarkedAlt class="text-green-700" />
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
                 </div>
             </div>
           )}
         </main>
    )
}

export default Listing;