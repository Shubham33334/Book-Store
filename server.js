const express = require('express');
const router = express.Router();
const app = express();
const passport = require('./auth');

const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
};
app.use(express.json()); // parses JSON body into req.body
app.get('/', (req, res) => {
    try{
        console.log('Server is running fine');
        return res.status(200).json({message:'Welcome to our book store'});
    }catch(err) {
        return res.status(500).json({error : 'Internal Server Error'});
    }
});
app.use(logRequest);


app.use(passport.initialize());

const passwordMiddleWare = passport.authenticate('local', {session : false});
//comment added for testing purpose

const BookRouts = require('./routes/BookRouts');
app.use('/books',passwordMiddleWare, BookRouts);

const PersonRouts = require('./routes/PersonRouts');
app.use('/person', PersonRouts);
app.listen(3000, ()=>{
    console.log('Listening on http://127.0.0.1/');
});

