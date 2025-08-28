import mongoose from "mongoose";

export default connector = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to teh database. Badhaai Ho!`);
    }catch(e){
        console.log(`Kuch gadbad hai daya :), connect nahi ho raha`)
    }
}


