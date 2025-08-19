const passport = require('passport');
const LocalStrategy = require('passport-local');
const Person = require('./models/books');
const { message } = require('prompt');

passport.use(new LocalStrategy(async(username, password, done)=>{
    //authetication
    try{
        const user = await Person.findOne({username});
        if(!user) {
            return done(null, false, {message:'Incorrect username'});
        }
        
        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch) {
            return done(null, user);
        }else {
            return done(null, false, {message : 'Incorrect password'});
        }
    }catch(err) {
        console.log(err);
        return done(err);
    }
}));

module.exports = passport;