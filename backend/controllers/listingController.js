const Listing = require('../models/Listing');
const User = require('../models/User');

exports.createListing=async(req,res)=>{
    const { title, description, quantity, pickupTime,  } = req.body;
    try{
        const newListing=new Listing({
            title,
            description,
            quantity,
            pickupTime,
            restaurantId: req.user.id
        })
        //listing will contain the mongodb generated fields too
        const listing=await newListing.save();
        // EMIT NOTIFICATION
    req.io.emit('newListing', listing); // This sends the new listing data to all connected clients
        res.status(201).json(listing);
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.getAllListings=async(req,res)=>{
    try{
        const listings=await Listing.find({status:'available'})
        .populate('restaurantId',['organizationName', 'address', 'phone'])
        .sort({createdAt:-1});

        res.json(listings)
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.claimListing=async(req,res)=>{
  try{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
      return res
      .status(400)
      .json({msg:'Listing is no longer available'})
    }
    listing.status='claimed';
    listing.claimedByNgoId=req.user.id;

    await listing.save();
    res.json(listing);
  }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ restaurantId: req.user.id })
      .populate('claimedByNgoId', 'organizationName phone')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getClaimedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ claimedByNgoId: req.user.id })
      .populate('restaurantId', 'organizationName address phone')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};