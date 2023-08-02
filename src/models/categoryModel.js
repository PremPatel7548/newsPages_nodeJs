const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:new Date()
    }
})

const categoryModel = new mongoose.model('Category',categorySchema);

module.exports = categoryModel;