const express = require('express');
const router = express.Router();
const Books = require('../models/books');



router.post('/', async(req,res) =>{
    try{
        const data = req.body;
        const newBook = new Books(data);
        const response = await newBook.save();

        console.log('Book is added');
        res.status(200).json({message : 'Thanks! Your book has been added.'});
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async(req, res) => {
    try{
        const data = await Books.find();
        console.log('data fetched Successfully');
        return res.status(200).json({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const book = await Books.findOne({_id :req.params.id});
        if(!book) {
            return res.status(404).json({message : 'Book not found'});
        } 
        res.status(200).json(book);
    }catch(err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const updatedBook = await Books.findByIdAndUpdate(
            req.params.id, // which book to update
            req.body,// fields to update
            {new : true, runValidators: true}
        );

        //Alternate 
        // const book = await Book.findById(req.params.id);
        // if (book) {
        //     Object.assign(book, req.body);
        //     await book.save();
        // }
        if(!updatedBook) {
            return res.status(400).json({message : 'Book not found'});
        }
        res.status(200).json(updatedBook);
    }catch(err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const deletedBook = await Books.findByIdAndDelete(req.params.id,);

        if(!deletedBook) {
            return res.status(404).json({messsage : 'Book not found'});
        }
        res.status(200).json({message : 'Book deleted successfully'});
    }catch(err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});
module.exports = router;