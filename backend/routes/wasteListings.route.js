const express = require('express')
const router = express.Router()
const multer = require("multer")
const { GoogleGenAI } = require("@google/genai")
const path = require("path")
const fs = require("fs")
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")

// get
router.get("/get-all-wastelistings", verifyUser, async (req, res) => {
    try {
        const wastelistings = await WasteListings.find({}).populate("seller_id", "company_name")
        res.json(wastelistings)
    } catch (err) {
        res.json({ message: err.message })
    }
})


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

router.post("/seller-upload-waste", geminiUpload.single("image"), verifyUser, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const PROMPT = `
        You are a waste classification assistant. Your task is to analyze an image of waste material and provide a detailed classification and description based on the visual information.
Respond with ONLY a raw JSON object (no markdown, no code fences, no extra text) in exactly this shape:
{
  "title": "string - A concise and descriptive title for the waste shown in the image.",
  "category": "string - Choose ONLY one option from the following list: Construction, Metals, Wood.",
  "quantity": "number - Provide an estimated numerical value for the quantity of the waste.",
  "unit": "string - Choose ONLY one unit from the following list that corresponds to the 'quantity': kg, tons, lbs, units, m3.",
  "colour": "string - The predominant color of the waste material visible in the image.",
  "description": "array of strings - Provide a description of the waste in 4 to 7 bullet points. Each string in the array should be a complete sentence. The description must be written from the perspective of a seller trying to convince a buyer, highlighting the value and potential uses of the waste material. Do not use single-word bullet points.",
  "price": "number - Provide an estimated market price for the entire quantity of the waste. think about the price in-term of LKR. don't place LKR symbol at the starting or ending. just number",
  "currency": "string - Choose ONLY one currency symbol from the following list for the estimated 'price': LKR, $.",
  "confidence_score": "string - Provide an estimated confidence score about the identified waste category for the given image between 80-90%."
}
If you are unsure about a field, make your best visual estimate rather than leaving it blank. Analyze the provided image and generate the JSON output.
        `.trim();

        const imageBase64 = req.file.buffer.toString("base64");
        const mimeType = req.file.mimetype;

        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: PROMPT },
                        { inlineData: { mimeType, data: imageBase64 } },
                    ],
                },
            ],
        });

        const rawText = response.text.trim();
        const cleaned = rawText.replace(/^```json\s*|```$/g, "").trim();
        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch (parseErr) {
            return res.status(502).json({
                error: "Gemini did not return valid JSON",
                raw_response: rawText,
            });
        }

        res.json(parsed);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error", error: err.message });
    }
})

router.post("/seller-upload-waste-save", localUpload.single("image"), verifyUser, async (req, res) => {
    try {
        const formData = new WasteListings({
            seller_id: req.token.user_id,
            title: req.body.title,
            category: req.body.category,
            quantity: req.body.quantity,
            unit: req.body.unit,
            colour: req.body.colour,
            description: req.body.description,
            price: req.body.price,
            currency: req.body.currency,
            location: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                postal_code: req.body.postal_code
            },
            status: req.body.status,
            suspend_message: null,
            created_at: new Date(),
            updated_at: new Date(),
        })
        formData.image = req.file.filename
        await formData.save();

        res.status(200).json({ message: "data was saved", formData })

    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
})


//put
router.put("/update-listing-status", verifyUser, async (req, res) => {
    try {
        const { listing_id, status, suspend_message } = req.body;
        const updatedListing = await WasteListings.updateOne(
            { _id: listing_id },
            {
                status: status,
                suspend_message: status === "Rejected" ? suspend_message : null
            }
        );
        res.json(updatedListing)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put("/update-listing/:id", localUpload.single("image"), verifyUser, async (req, res) => {
    try {
        const listingId = req.params.id;
        const updateData = {
            title: req.body.title,
            category: req.body.category,
            quantity: req.body.quantity,
            unit: req.body.unit,
            colour: req.body.colour,
            description: req.body.description,
            price: req.body.price,
            currency: req.body.currency,
            location: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                postal_code: req.body.postal_code
            },
            status: req.body.status,
            updated_at: new Date()
        };

        if (req.file) {
            const existingListing = await WasteListings.findOne({ _id: listingId, seller_id: req.token.user_id });
            if (existingListing && existingListing.image) {
                const oldImagePath = path.join(__dirname, "../uploads", existingListing.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = req.file.filename;
        }

        await WasteListings.updateOne(
            { _id: listingId, seller_id: req.token.user_id },
            { $set: updateData }
        );

        const updatedListing = await WasteListings.findOne({ _id: listingId });
        res.status(200).json({ message: "Listing updated successfully", formData: updatedListing });

    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
});


// delete
router.delete("/delete-listing/:id", verifyUser, async (req, res) => {
    try {
        const listingId = req.params.id;

        const existingListing = await WasteListings.findOne({ _id: listingId, seller_id: req.token.user_id });
        if (!existingListing) {
            return res.status(404).json({ message: "Listing not found or not authorized" });
        }

        if (existingListing.image) {
            const oldImagePath = path.join(__dirname, "../uploads", existingListing.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        await WasteListings.deleteOne({ _id: listingId, seller_id: req.token.user_id });

        res.status(200).json({ message: "Listing deleted successfully", id: listingId });

    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
});


module.exports = router
