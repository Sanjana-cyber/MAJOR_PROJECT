const express=require("express");
const engine = require('ejs-mate');

const path = require('path');

const app=express();
const mongoose=require("mongoose");
const methodOverride = require('method-override');
const Listing=require("./MODELS/listing");
app.use(express.static(path.join(__dirname, 'public'))); 

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

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
app.get("/listing", async (req, res,next) => {
    try{
        let allList = await Listing.find({});
        res.render("listing", { allList });
    }
    catch(err){
        next(err);
    }
    
    
});



//create route
app.get("/listing/new",(req,res)=>{
    res.render("create_new");
})

app.post("/listing/new",async(req,res)=>{
   
        try {
         let listing=req.body.listing;
    let newListing=new Listing(listing);
     await newListing .save();
    res.redirect("/listing");
    } 
    catch (err) {
        next(err);
    }


})

//edit route
app.get("/listing/:id/edit",async(req,res)=>{

      try {
        let {id}=req.params;
   let detail= await Listing.findById(id)
    res.render("edit",{detail});

    } 
    catch (err) {
        next(err);
    }

})

//update route

app.put("/listing/:id/update",async(req,res)=>{
    
     try {
    let {id}=req.params;
    let update= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);

    } 
    catch (err) {
        next(err);
    }
})

// /DELETE 
app.delete("/listing/:id",async(req,res)=>{
     try {
    let {id}=req.params;
    let del= await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
     res.render("show", { detail });

    } 
    catch (err) {
        next(err);
    }
    

})

//show by id route
app.get("/listing/:id", async (req, res, next) => {
    try {
        let { id } = req.params;

        let detail = await Listing.findById(id);

        res.render("show", { detail });

    } catch (err) {
        next(err);
    }
});




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

//handling error
app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).send("Oops!Something went wrong!");
});

let port=8080;
app.listen(port,(res,req)=>{
    console.log("your app is running on port",port);
})