exports.route = (app) => {
  let userController = require('../controller/userController');
  let movieController = require('../controller/movieController');
  let passportLocal = require('../authentication/LocalStrategy');
  let {authorization} = require('../middleware/authorization');

  app.get('/success',(req, res) => {
    res.status(200).json({auth_token: Token});
  });

  app.get('/fail', (req, res) => {
    res.status(404).json({Error: "Fail: Please check your username and password"});
  });

  app.get('/api/users', userController.getAll);
  app.post('/api/users', userController.SignUp);
  app.post('/api/auth_user', passportLocal.authenticate('local', {
    successRedirect:'/success',
    failureRedirect: '/fail'
  }));

  // app.post('/api/auth_user', userController.SignIn);

  app.get('/api/movie', authorization, movieController.getAll);
  app.get('/api/movie/:id', authorization, movieController.getOne);
  app.post('/api/movie', authorization, movieController.new);
  app.put('/api/movie/:id', authorization, movieController.edit);
  app.delete('/api/movie/:id', authorization, movieController.remove);
  app.get('/api/search/movie', authorization, movieController.search);
};