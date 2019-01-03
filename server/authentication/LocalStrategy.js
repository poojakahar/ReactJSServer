let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let { con } = require('./../db/connect');

passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});

passport.use(new LocalStrategy((username, password, done) => {
  con.query("SELECT * from users where username = '" + username + "' and password = '" + password + "'", (err, response) => {
    if (err) return done(null,false);

    if(response && response.length > 0) {
      let id = response[0].id;
      let token  = jwt.sign({_id: id}, 'MOVIE').toString();

      con.query("UPDATE users set token='" + token + "' where id = " + id, (err, res) => {
        if(err) return done(null,false);
        Token = token;
        return done(null, true);
      });
    } else {
      return done(null,false);
    }
  });
}));

module.exports=passport;