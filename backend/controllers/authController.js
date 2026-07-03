const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser=async(req,res)=>{
    const { name, email, password, role, organizationName, address, phone } = req.body;

    try{
        let user=await User.findOne({email});
        if(user){
            return res
            .status(400)
            .json({msg: 'User already exists'});
        }

        user=new User({name, email, password, role, organizationName, address, phone})
            
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201)
        .json({token});
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

}

exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400)
            .json({msg:'Invalid credentials'});
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res
            .status(400)
            .json({msg:'Invalid credentials'})
        }

        const payload={user:{id:user.id}};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})

        res.json({token});
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

exports.getMe = async (req, res) => {
  try {
    // req.user.id is set by our authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};