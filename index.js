const express = require('express');
const logger=require('morgan');
require('./src/db/mongoose');
const port=process.env.PORT||7000;
const app=express();
//Routers
const signUpRouter = require('./src/routes/signUp');

app.use(express.json());
app.use(logger('dev'));
app.use("/signup",signUpRouter);
app.listen(port,()=>{
    console.log(`Started at ${port}`);
})