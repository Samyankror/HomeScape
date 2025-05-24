import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 



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
             </div>
           )}
         </main>
    )
}

export default Listing;