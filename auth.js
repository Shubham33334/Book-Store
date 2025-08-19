const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/PersonModel');
const { message } = require('prompt');

passport.use(new LocalStrategy(async(username, password, done)=>{
    //authetication
    try{
        const user = await Person.findOne({username});
        if(!user) {
            return done(null, false, {message:'Incorrect username'});
        }
        
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) return done(null, false, { message: 'Incorrect password' });
        return done(null, user);
    }catch(err) {
        console.log(err);
        return done(err);
    }
}));

module.exports = passport;