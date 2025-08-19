const express = require('express');
const Person = require('../models/PersonModel');
const router = express.Router();

router.post('/',async(req, res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json({message : 'person successfully Added'})
    }catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
});

router.get('/', async(req, res) =>{
    try{
        const response = await Person.find();
        console.log('Data fetches');
        res.status(200).json(response);
    }catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
});

module.exports = router;