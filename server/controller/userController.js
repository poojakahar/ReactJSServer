let { con } = require('./../db/connect');

exports.SignUp = (req,res) => {
  let params = req.body;
  let q = "INSERT INTO users(username,password,first_name,last_name,dob,email) values('" + params.username + "','" + params.password + "','" + params.first_name + "','" + params.last_name + "','" + params.dob + "','" + params.email + "')";
  con.query(q, (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response)
  })
};

exports.SignIn = (req,res) => {
  let params = req.body;
  let q = "SELECT * from users where username = '" + params.username + "' and password = '" + params.password + "' LIMIT 1";
  con.query(q, (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response)
  })
};

exports.getAll = (req,res) => {
  con.query("SELECT * from users", (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response)
  });
};