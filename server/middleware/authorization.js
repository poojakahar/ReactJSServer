exports.authorization = (req, res, next) => {
  let token = req.headers && req.headers.token;
  if (token) {
    next()
  } else {
    return res.status(401).json({"Error": "Unauthorized access"});
  }
};