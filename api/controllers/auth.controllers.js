import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const signUp = async(req,res,next)=>{
    console.log(req.body)
    const {username, email, password} = req.body
    const hashedPassowrd = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassowrd})
   
    try{
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully"
          });
          
    } catch(error){
        next(error);
    } 
}

export const signIn = async(req,res,next)=>{
  const {email,password} = req.body
   try{
       const validUser = await User.findOne({email})
      
       if(!validUser){
        
        return next(errorHandler(404,'user not found'))
       }

       const isPasswordCorrect = bcryptjs.compareSync(password,validUser.password);
       if(!isPasswordCorrect){
    
        return next(errorHandler(401,'invalid password'))
       }
       const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
       const {password : pass, ...rest} = validUser._doc
       res
       .cookie('access_token', token, { httpOnly : true } )
       .status(200)
       .json({
        success: true,
        user: rest
      });
      
   } catch(error){
    next(error)
   }

}