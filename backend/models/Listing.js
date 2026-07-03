const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  restaurantId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  title:{
    type: String,
    required: true
},
  description:{
    type: String,
    required: true
},
  quantity:{
    type: String,
    required: true
}, // e.g., "serves 10", "20 bread loaves"
  pickupTime:{ 
    type: String,
    required: true
},

  status:{
    type: String,
    enum: ['available', 'claimed', 'picked-up'], default: 'available'
},
  claimedByNgoId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
},
}, { timestamps: true });

module.exports = mongoose.model('Listing', ListingSchema);