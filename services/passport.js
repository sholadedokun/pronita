//passport for authentication
const passport = require('passport')
const LocalStrategy = require('passport-local');
const appSchema = require('../app/models/appSchema.js');
const config = require('../config/config')
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: "identity",
    passwordField: "password"
  },
  function(username, password, done) {

    appSchema.user.findOne({$or:[{userName:username}, {email:username}]}, function(err, userData) {
        if (err) return done(err);
        if (!userData){
            return done(null, false, {message: "Wrong Username"} )
        }
        // test a matching password
        userData.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if(isMatch){
                return done(null, userData);
            //    res.json(userData);
            }
            else{
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    })

  }
));
