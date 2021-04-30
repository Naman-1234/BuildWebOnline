const express = require('express');
const logger=require('morgan');
require('./src/db/mongoose');
const cors = require('cors');
const port=process.env.PORT||7000;
const app=express();

//Routers
const signUpRouter = require('./src/routes/signUp');
const loginRouter = require('./src/routes/login');

//Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.use("/signup",signUpRouter);
app.use("/login",loginRouter);
app.listen(port,()=>{
    console.log(`Started at ${port}`);
})