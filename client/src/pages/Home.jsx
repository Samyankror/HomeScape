import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ListingItem from "../components/ListingItem";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?limit=15");
        const data = await res.json();
        setRecentListings(data);
        fetchOfferListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentListings();
  }, []);

  return (
    <div>
      <div className='flex flex-col sm:flex-row '>
      <div className="flex flex-col py-28 gap-8  px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-6xl">
          Your dream home is <br />
          just a click away
          <span className="opacity-70 "> </span>
          <br />
        </h1>
        <p className="text-slate-600 text-lg font-semibold">
          At HomeScape, we connect you with properties that feel like home.{" "}
          <br />
          Whether you're looking to rent or buy, we've got the perfect match for
          you.
        </p>
        <Link
          to={"/search"}
          className="font-bold text-blue-800 text-xl hover:underline cursor pointer"
        >
          Lets get started...
        </Link>
      </div>
       <div className='max-w-[700px] py-14 px-3 pr-6 rounded-lg'>
        <img src="https://res.cloudinary.com/dltiymhzd/image/upload/v1757434449/ChatGPT_Image_Sep_9_2025_09_42_07_PM_uicyiq.png"/>

       </div>

      </div>

      <Swiper navigation>
        {recentListings &&
          recentListings.length > 0 &&
          recentListings.map((listing) => (
            <SwiperSlide>
              <img
                src={listing.imageUrls[0]}
                alt=""
                className="w-full h-[550px] object-cover"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="flex flex-col  gap-8 max-w-6xl mx-auto my-10 p-3 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-6">
              <h2 className="text-2xl font-semibold text-slate-600 my-3">
                Recently Listed offers
              </h2>
            </div>
            <div className="flex   flex-col  sm:flex-row sm:flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
              {offerListings.length>=4 && 
              <div className="flex justify-end pr-4">
                    <Link
                className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                   >
                   Show more offers
                </Link>
                 </div>}

          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600 my-3">
                Recently Listed places for rent
              </h2>
             </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            {rentListings.length>=4 && 
              <div className="flex justify-end pr-4">
                    <Link
                className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                   >
                   Show more places for rent
                </Link>
                 </div>}

          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600 my-3">
                Recently Listed places for Sale
              </h2>
            </div>
            <div className="flex  flex-col sm:flex-row sm:flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            {rentListings.length>=4 && 
              <div className="flex justify-end pr-4">
                    <Link
                className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                   >
                   Show more places for sale
                </Link>
                 </div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
