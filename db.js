const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/books';
mongoose.connect(mongoURL);

const db = mongoose.connection;

//event listers

db.on('connected', ()=>{
    console.log('Connected to mongoDB server');
});

db.on('error',(err)=> {
    console.log('MongoDB connection error', err);
});

db.on('disconnected', ()=> {
    console.log('Disconnected');
});



module.exports = mongoose;
