const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createListing, getAllListings,claimListing,getMyListings, getClaimedListings} = require('../controllers/listingController');

router.post('/',auth,createListing);
router.get('/',getAllListings);
router.put('/claim/:id', auth, claimListing);
router.get('/mylistings', auth, getMyListings);
router.get('/claimed', auth, getClaimedListings);

module.exports=router;