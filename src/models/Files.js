const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        default:'untitled',
        required:true,
        unique:true
    },
    content:{
        type:String,
        default:`<html>
        <style></style>
        <script></script>
        </html>`,
    },
    //Because owner will be _id, hence taking its type to be ObjectId, Also owner is kind of acting as a foreign key here,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

fileSchema.statics.getAllDocuments = async (id)=>{
    const allDocuments = await File.find({
        owner:id
    })
    console.log('All Documents are',allDocuments);
    return allDocuments;
}
const File = new mongoose.model('File',fileSchema);
module.exports = File;