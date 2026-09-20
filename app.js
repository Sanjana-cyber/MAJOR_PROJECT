const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Listing = require("./MODELS/listing");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connection string

let MONGO_URL = "mongodb+srv://sanjanapandey29256_db_user:QoJAwb4BwzppLA1x@cluster0.bkxjhhl.mongodb.net/?appName=Cluster0";

app.use(methodOverride("_method"));


// MongoDB connection
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("mongo db is connected");
    })
    .catch((err) => {
        console.log(err);
    });


// Index route
app.get("/", (req, res) => {
    res.send("hi i am a root");
});


// Show all route


app.get("/listing", wrapAsync(async (req, res) => {

    let allList = await Listing.find({});

 
    res.render("listing", { allList });
}));


// Create new listing page
app.get("/listing/new", (req, res) => {
    res.render("create_new");
});


// Create route
app.post("/listing/new", wrapAsync(async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Bad request");
    }

    let listing = req.body.listing;

    let newListing = new Listing(listing);

    await newListing.save();
  res.status(201).json({
        message: "Listing created successfully",
        listing: newListing
    });
    // res.redirect("/listing");

}));


// Edit route
app.get("/listing/:id/edit", wrapAsync(async (req, res) => {

    let { id } = req.params;

    let detail = await Listing.findById(id);
    if (!detail) {
        throw new ExpressError(404, "Listing not found");
    }

    res.render("edit", { detail });

}));


// Update route
app.put("/listing/:id/update", wrapAsync(async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Bad request");
    }

    let { id } = req.params;

    await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing }
    );

    res.redirect(`/listing/${id}`);

}));


// Delete route
app.delete("/listing/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    let del = await Listing.findByIdAndDelete(id);

    res.redirect("/listing");

}));


// Show by ID route
app.get("/listing/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    let detail = await Listing.findById(id);
    if (!detail) {
        throw new ExpressError(404, "Listing not found");
    }

    res.render("show", { detail });

}));

//if route doesnot exist
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {

    console.log(err);

    let status = err.status || 500;
    let message;

    if (err instanceof ExpressError) {
        message = err.message;
    } else {
        message = "Something went wrong";
    }

    res.status(status).render("error", { message });
});


// Server
let port = 8080;

app.listen(port, () => {
    console.log("your app is running on port", port);
});