import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(express.json())

const DbName='mern-estate'
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to mongodb successfully');
})
.catch((err)=>{
    console.log(err);
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Ineternal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

