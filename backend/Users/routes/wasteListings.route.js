const express = require('express')
const router = express.Router()
const multer = require("multer")
const path = require("path")
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    getAllWasteListings,
    getAllActiveWasteListings,
    getBuyerWasteMatches,
    getSellerActiveWasteListings,
    getSellerWasteMatches,
    sellerUploadWaste,
    sellerUploadWasteSave,
    updateListingStatus,
    updateListing,
    deleteListing
} = require("../controllers/wasteListings.controller.js")

// post
const geminiUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const localUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
})

// get
router.get("/get-all-wastelistings", verifyUser, getAllWasteListings)
router.get("/get-all-active-wastelistings", verifyUser, getAllActiveWasteListings)
router.get("/get-buyer-waste-matches", verifyUser, getBuyerWasteMatches)
router.get("/get-seller-active-waste-listings", verifyUser, getSellerActiveWasteListings)
router.get("/get-seller-waste-matches/:id", verifyUser, getSellerWasteMatches)

// post
router.post("/seller-upload-waste", geminiUpload.single("image"), verifyUser, sellerUploadWaste)
router.post("/seller-upload-waste-save", localUpload.single("image"), verifyUser, sellerUploadWasteSave)

//put
router.put("/update-listing-status", verifyUser, updateListingStatus)
router.put("/update-listing/:id", localUpload.single("image"), verifyUser, updateListing)

// delete
router.delete("/delete-listing/:id", verifyUser, deleteListing)

module.exports = router
