import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async(req,res,next)=>{
  try{
        console.log(req.body);
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
  } catch(error){
    next(error);
  }
}

export const deleteListing = async(req,res,next) =>{
  
   const listing = await Listing.findById(req.params.id)
    
   if(!listing){
    return next(errorHandler(404,'Listing is not found!'))
   }
   
   if(req.user.id!==listing.userRef){
    return next(errorHandler(401,'You can only delete your own listing!'))
   }
   try{
       await Listing.findByIdAndDelete(req.params.id)
       return res.status(200).json({success:true});
   } catch(error){
    next(error);
   }

}

export const updateListing = async(req,res,next)=>{
      const listing = await Listing.findById(req.params.id);
     
      
      if(!listing){
       
        return next(errorHandler(404,'Listing not found'));
      }
      if(req.user.id!==listing.userRef){
        
        return next(errorHandler(401,'You can only delete your own listing!'))
       }

       try{
            const updatedListing = await Listing.findByIdAndUpdate(
              req.params.id,
              req.body,
            {new : true}                                              
            )
            res.status(200).json({success:true,updatedListing})
       } catch(error){
          next(error)
       }

}


export const getListing = async(req,res,next)=>{
         try{ 
          console.log(req.params.id);
            const listing = await Listing.findById(req.params.id)
            console.log(listing);
            if(!listing){
              return next(errorHandler(404,'Listing not found'))
            }

            return res.status(200).json({success:true,listing})
         } catch(error){
             next(error)
         }
}

