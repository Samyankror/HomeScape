import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const uploadImage = async(req,res,next)=>{
    console.log('yes')
  if (!req.file) {
   
    return res.status(400).json({ success: false, message: "No file uploaded" });
   }  
     const listImg = req.file.path
      
     try{
       let  img = await uploadOnCloudinary(listImg)
       
       if(img){
        res.status(200).json({success:true,imageUrl:img.url})
       }
     } catch(error){
       
      res.status(500).json({success:false,message:error.message})
     }

}   