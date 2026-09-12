const express=require("express");
const app=express();
const mongoose=require("mongoose");
const methodOverride = require('method-override');
const Listing=require("./MODELS/listing")

app.set("view engine","ejs");
 app.use(express.urlencoded({extended :true}));
let MONGO_URL="mongodb+srv://sanjanapandey29256_db_user:QoJAwb4BwzppLA1x@cluster0.bkxjhhl.mongodb.net/?appName=Cluster0"
app.use(methodOverride('_method'));

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

//index route
app.get("/", (req,res)=>{
     res.send("hi i am a root");
})

//show all  route
app.get("/listing",async (req,res)=>{
    let allList=  await Listing.find({});
    res.render("listing",{allList});

})

//create route
app.get("/listing/new",(req,res)=>{
    res.render("create_new");
})

app.post("/listing/new",async(req,res)=>{
    let listing=req.body.listing;
    let newListing=new Listing(listing);
     await newListing .save();
    res.redirect("/listing");

})

//edit route
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
   let detail= await Listing.findById(id)
    res.render("edit",{detail});
})

//update route

app.put("/listing/:id/update",async(req,res)=>{
    let {id}=req.params;
    let update= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`)
})

// /DELETE 
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
     let del= await Listing.findByIdAndDelete(id);
    res.redirect("/listing");

})

//show by id route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
   let detail=await  Listing.findById(id);
    res.render("show",{detail});
})





// app.get("/testListing",async (req,res)=>{
// let sample =new Listing({
//         title:"flat",
//         description:" it is a 2BHK flat",
//         Image:" ",
//         price:7000,
//         location:"Banglore",
//         country:"India"

//     });
//     await sample.save();
//     console.log("data is saved");
//     res.send("succesfully saved");
// })
let port=8080;
app.listen(port,(res,req)=>{
    console.log("your app is running on port",port);
})