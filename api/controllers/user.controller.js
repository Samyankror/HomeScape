import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
  };


  export const updateUser = async(req,res,next)=>{
   
       if(req.user.id!=req.params.id) {
        return next(errorHandler(401,'You can only update your own account!'))
       }

      try{
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set : {
              username : req.body.username,
              email : req.body.email,
              password : req.body.passowrd,
              avatar : req.body.avatar,
            },
          },
          {new : true}
        )
          
        const {password,...rest} = updateUser._doc
        res.status(200).json({success:true,user: rest});
      }catch(error){
         next(error)
      }
  }


  export const uploadProfileImage = async(req,res,next)=>{
    
     const avatarPath=req.file.path;
  
     let avatar = "";
     try{
       avatar = await uploadOnCloudinary(avatarPath);
      
     } catch(error){
       console.log("Error uploading avatar",error)
     }
    
   
     res.status(200).json({success : true,imageUrl:avatar.url});
  }

  export const deleteUser  = async (req,res,next) =>{
          if(req.params.id!=req.user.id) {
            return next(errorHandler(401,"you can only delete your own account"))
          }
          try{
          await User.findByIdAndDelete(req.params.id);
           
            res.clearCookie('accessToken',{httpOnly: true})
               .status(200)
               .json({success:true,message:'User has been deleted'})
          } catch(error){ 
             next(error)
          }
  }