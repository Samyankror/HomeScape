import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import ListingItem from "../components/ListingItem";



function Home(){
     SwiperCore.use([Navigation]);
    const [offerListings,setOfferListings] = useState([]);
    const [saleListings,setSaleListings] = useState([]);
    const [rentListings,setRentListings] = useState([]);

    useEffect(()=>{
        const fetchOfferListings = async()=>{
           try{
          const res = await fetch('/api/listing/get?offer=true&limit=4');
          const data = await  res.json();
           setOfferListings(data);
           fetchRentListings();

    }catch(error){
    console.log(error);
     }
    }

     
    const fetchRentListings = async()=>{
           try{
             const res = await fetch('/api/listing/get?type=rent&limit=4');
             const data = await res.json();
             setRentListings(data);
             fetchSaleListings();
           }catch(error){
            console.log(error);
           }
    }

    const fetchSaleListings = async()=>{
           try{
             const res = await fetch('/api/listing/get?type=sale&limit=4');
             const data = await res.json();
             setSaleListings(data);
           }catch(error){
            console.log(error);
           }
    }

     fetchOfferListings();
}    ,[])




    return (
        
        <div>
            <div className="flex flex-col gap-8 py-28 px-3 max-w-6xl mx-auto">
                <h1 className='text-slate-700 font-bold text-6xl'>Find your next 
                    <span className='opacity-70 '> perfect</span><br /> place with ease</h1>
                <p className='text-slate-600 text-lg'>Samyank Estate is the best place to find your next perfect place to live.
                    <br/>
                    We have a wide range of properties for you to choose from.
                </p>
                <Link to={'/search'}
                className='font-bold text-blue-800 text-xl hover:underline cursor pointer'
                >Lets get started...</Link>
            </div>
          

          <Swiper navigation>
            {offerListings && offerListings.length>0 &&  offerListings.map((listing)=>(
                <SwiperSlide>  
                    <img src={listing.imageUrls[0]} alt="" className='w-full h-[550px] object-cover'/>
                 </SwiperSlide>
            )
            )}
            </Swiper>  

            <div className='flex flex-col  gap-8 max-w-6xl mx-auto my-10 p-3 '>
                {offerListings && offerListings.length>0 && (
                    <div className=''>
                        <div className="my-6">
                        <h2  className='text-2xl font-semibold text-slate-600 my-3'>Recently Listed offers</h2>
                        <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
                        </div>
                         <div className='flex   flex-col  sm:flex-row sm:flex-wrap gap-4'>
                        
                            {offerListings.map((listing)=>(
                                  <ListingItem listing={listing} key={listing._id} />
                            ))}
                         </div>
                    </div>
                )}
                {rentListings && rentListings.length>0 && (
                    <div>
                        <div className="">
                           <h2  className='text-2xl font-semibold text-slate-600 my-3'>Recently Listed places for rent</h2>
                          <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
                        </div>
                         <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4'>
                            {rentListings.map((listing)=>(
                                  <ListingItem listing={listing} key={listing._id} />
                            ))}
                         </div>
                    </div>
                )}
                {saleListings && saleListings.length>0 && (
                    <div >
                        <div className="">
                        <h2  className='text-2xl font-semibold text-slate-600 my-3'>Recently Listed places for Sale</h2>
                        <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
                         </div>
                         <div className='flex  flex-col sm:flex-row sm:flex-wrap gap-4'>
                            {saleListings.map((listing)=>(
                                  <ListingItem listing={listing} key={listing._id} />
                            ))}
                         </div>
                    </div>
                )}
            </div>

        </div>
        
    )
}

export default Home;