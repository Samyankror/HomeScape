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



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

