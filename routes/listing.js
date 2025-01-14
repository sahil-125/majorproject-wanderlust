const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(    //create route
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
 

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show route
  .put(                                                  //update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(                                              //delete route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
