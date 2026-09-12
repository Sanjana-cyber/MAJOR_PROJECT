const mongoose = require("mongoose");
const initdata=require("../data.js");
const Listing=require("../MODELS/listing.js");


//mongodb connection 
let MONGO_URL="mongodb+srv://sanjanapandey29256_db_user:QoJAwb4BwzppLA1x@cluster0.bkxjhhl.mongodb.net/?appName=Cluster0"


 async function main(){
await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("mongo db is connected");
})

.catch((err)=>{
    console.log(err)
})

//inserion data in database
const initDB=async ()=>{
     await Listing.deleteMany({});
      await Listing.insertMany(initdata.data);
      console.log("data is initialized");
}

initDB();