const exprees=require("express");
const app=express();
const mongoose=require("mongoose");

app.get("/",(req,res)=>{
    res.send("hi i am a root");
})
let port=8080;
app.listen(port,(res,req)=>{
    console.log("ypur app is running on port",port);
})