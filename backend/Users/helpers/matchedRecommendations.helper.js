const Matches = require("../models/matches.model.js")

function calculateLocationScore(listingLocation, buyerAddress) {
    if (listingLocation.postal_code === buyerAddress.postal_code) {
        return 100; // same postal code — best possible proximity signal you have
    }
    if (listingLocation.city === buyerAddress.city) {
        return 70; // same city, different postal code
    }
    if (listingLocation.state === buyerAddress.state) {
        return 40; // same state/region — still worth showing, just lower priority
    }
    return 10; // different state — still technically matched on category, but low priority
}

function calculateQuantityFitScore(listingQuantity, buyerMinQty, buyerMaxQty) {
    if (listingQuantity >= buyerMinQty && listingQuantity <= buyerMaxQty) {
        return 100; // listing is right in the buyer's stated range
    }
    // Listing is outside range — score based on how far outside
    const nearestBound = listingQuantity < buyerMinQty ? buyerMinQty : buyerMaxQty;
    const distance = Math.abs(listingQuantity - nearestBound);
    const percentOff = distance / nearestBound;

    // Decay the score the further outside the range it is, floor at 0
    return Math.max(0, 100 - (percentOff * 100));
}

// matchScore = (categoryMatch × 50) + (locationScore × 30) + (quantityFitScore × 20)

const matchedRecommendations = async (
    listingLocation,
    buyerAddress,
    listingQuantity,
    buyerMinQty,
    buyerMaxQty,
    wasteListings_id,
    buyer_id
) => {
    const locationScore = calculateLocationScore(listingLocation, buyerAddress);
    const quantityFitScore = calculateQuantityFitScore(listingQuantity, buyerMinQty, buyerMaxQty);
    const matchScore = (100 * 50) + (locationScore * 30) + (quantityFitScore * 20);
    const match = await new Matches({
        wasteListings_id,
        buyer_id,
        matchScore: matchScore / 100,
        created_at: new Date()
    })
    await match.save();
}

module.exports = matchedRecommendations
