const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./MODELS/listing")

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
app.get("/",(req,res)=>{
    res.send("hi i am a root");
})

app.get("/testListing",async (req,res)=>{
let sample =new Listing({
        title:"flat",
        description:" it is a 2BHK flat",
        Image:" ",
        price:7000,
        location:"Banglore",
        country:"India"

    });
    await sample.save();
    console.log("data is saved");
    res.send("succesfully saved");
})
let port=8080;
app.listen(port,(res,req)=>{
    console.log("your app is running on port",port);
})