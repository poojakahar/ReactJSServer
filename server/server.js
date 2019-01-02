let express=require('express');
let bodyParser=require('body-parser');
let cors = require('cors');
let passport=require('passport');

global.Token="";

let router=require('./router/route');
let app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


router.route(app);

app.listen(3001,() => {
  console.log('Server Started');
});