const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const TOKEN = process.env.TOKEN;


// permet d'authentifier les requetes grâce au token

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    const decodedToken = jwt.verify(token, TOKEN);
    //console.log(decodedToken);
    const userId = decodedToken.userId;
    const status = decodedToken.status;
    //console.log(status);
    //console.log(userId);
    if (status !== 'admin' && req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'pas marché'
    });
  }
};