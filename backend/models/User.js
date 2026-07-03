const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['restaurant', 'ngo'],
        required: true
    },
  organizationName:{
    type: String,
    required: true 
    },
  address:{type: String, required: true},
  phone: { type: String, required: true},
},{timestamps:true})

module.exports = mongoose.model('User', UserSchema);