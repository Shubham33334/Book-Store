const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/books';
mongoose.connect(mongoURL);

const db = mongoose.connection;

//event listers

db.on('connected', ()=>{
    console.log('Connected to mongoDB server');
});

db.on('err',()=> {
    console.log('MongoDB connection error', err);
});

db.on('disconned', ()=> {
    console.log('Disconnected');
});



module.exports = mongoose;
