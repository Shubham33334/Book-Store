const { Schema } = require('mongoose');
const mongoose = require('../db');


//Fields: title (string, required), author (string, required), 
// price (number, min 0), inStock (boolean, default true),
// tags (array of strings).

//Add timestamps.

const booksSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    author : {
        type : String,
        required: true,
    },
    price : {
        type : Number,
        default : 0,
    },
    inStock :{
        type:Boolean,
        default:true
    },
    tags : {
        type:[String],
    }

});

const Books = mongoose.model('Books', booksSchema);
module.exports = Books;