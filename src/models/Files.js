const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        default:untitled,
        unique:true
    },
    content:{
        type:String,
        default:`<html>
        <style></style>
        <script></script>
        </html>`,
    }
})
const File = new mongoose.model('File',fileSchema);
module.exports = File;