const { Mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const mongoose = require('../db');

const PersonScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true,
    }
});

PersonScheme.pre('save', async function (next) {
    const person = this;
    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }catch(err) {
        console.log(err)
        next(err);
    }
});

PersonScheme.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err) {
        console.log(err);
        throw err;
    }
}

const Person = mongoose.model('Person', PersonScheme);

module.exports = Person;