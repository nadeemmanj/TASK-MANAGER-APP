import mongoose from "mongoose";


export default async function connectDB() {
    try{
       await mongoose.connect(process.env.MONGO_URI)
       .then(() =>{
        console.log("Mongodb Connected");
        
    })
    }
    catch(err){
        console.log(" Mongodb error", err);
        process.exit(1);
    }

}
