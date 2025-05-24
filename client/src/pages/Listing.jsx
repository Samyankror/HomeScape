import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';


function Listing(){
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
        setListing(data);
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
    return (
         <main>
            <div>{loading ? 'loading...' : "helo"}</div>
         </main>
    )
}

export default Listing;