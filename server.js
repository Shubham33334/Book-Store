const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json()); // parses JSON body into req.body
app.get('/', (req, res) => {
    try{
        console.log('Server is running fine');
        return res.status(200).json({message:'Welcome to our book store'});
    }catch(err) {
        return res.status(500).json({error : 'Internal Server Error'});
    }
});

const BookRouts = require('./routes/BookRouts');
app.use('/books', BookRouts);

app.listen(3000, ()=>{
    console.log('Listening on http://127.0.0.1/');
});

