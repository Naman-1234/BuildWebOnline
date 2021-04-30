const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');

router.post("/",(req,res)=>{
try{
const user = User.findByCredentials(req.body.email,req.body.password);
res.status(200).send(user);
}
catch(err)
{
    res.status(403).send('No One Found');
}

})
module.exports=router;