import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async() => {
   try{
   const connectonInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   console.log(`\n MongoDb connected !! DB HOST : ${ connectonInstances.connection.host}`)
   }
   catch(err){
    console.log("MONGODB connection failed",err)
   }
}

export default connectDB