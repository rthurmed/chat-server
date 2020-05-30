var jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  var token = req.token;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.user = decoded;
    next();
  });
}

exports.sign = (payload) => {
  return jwt.sign({ payload }, process.env.SECRET, {
    expiresIn: 300 // expires in 5min
  });
}