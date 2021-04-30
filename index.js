const express = require('express');
require('./src/db/mongoose');
const port=process.env.PORT||7000;
const app=express();

app.listen(port,()=>{
    console.log(`Started at ${port}`);
})