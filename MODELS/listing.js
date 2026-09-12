const mongoose=require("mongoose");
const schema=mongoose.Schema;

const listingSchema= new schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    Image:{
        type:String,
        set:(v)=>v==="https://plus.unsplash.com/premium_photo-1766012368356-69b7ee24081d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "?"":v
    },price:Number,
    location:String,
    country:String
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports = Listing;