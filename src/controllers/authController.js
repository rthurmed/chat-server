const { model } = require('mongoose');
const { sign } = require('../security/jwt');
const { cryptPassword, comparePassword } = require('../security/hash');

const User = model('User');

exports.register = (req, res) => {
  cryptPassword(req.body.pass, (err, pass) => {
    if (err) {
      res.status(500).send('Internal server error')
      return;
    }
    User.create({
      ...req.body,
      pass
    }, (err, user) => {
      if (err) res.status(500).json(err)
      res.json(user)
    })
  })
}

exports.login = (req, res) => {
  const { email, pass } = req.body;
  User.findOne({ email })
    .select('+pass')
    .exec((err, user) => {
      if (err) res.status(500).json(err);
      if (user == null) res.status(400).json({ message: 'User not found' });
      const hashed = user.pass;
      comparePassword(pass, hashed, (err, match) => {
        if (err) res.status(400).json(err);
        if (!match) {
          res.status(400).json({ message: 'Invalid login!' });
        }
        userObj = user.toObject();
        delete userObj.pass;
        const token = sign(userObj);
        res.status(200).send({ auth: true, token });
      })
    });
}

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
}

exports.me = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) res.status(500).json(err);
    if (user == null) res.status(400).json({ message: 'User not found' });
    res.status(200).json(user);
  })
}