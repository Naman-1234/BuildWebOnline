const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req, res,next)=>{
    try {
    //Will use bearer token in Authorization Header
    const token = req.header('Authorization').replace('Bearer ','');
    //Verifying the token
    const decoded = jwt.verify(token, process.env.secret);
    if(!decoded)
    res.status('401').send('Please authenticate');
    next();
    }
    catch(err){
        res.status('401').send('Please authenticate');
    }

}