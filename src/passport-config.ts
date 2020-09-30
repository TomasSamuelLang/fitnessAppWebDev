import passport from 'passport';
import { Strategy } from 'passport-local'
import User from './model/User';

passport.use('local', new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        User.findOne({ email: email }, (err: any, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
  }
));

passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
});