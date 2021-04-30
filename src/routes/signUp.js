const router = require('express').Router();
const User = require('../models/User');
router.post("/",async (req,res)=>{
    try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({user,token});
    }
    catch(err){
        console.log('Error is ',err);
        res.status(500).send(req.body);
    }
})

module.exports=router;