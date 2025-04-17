import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
export const signup = async(req,res,next)=>{
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