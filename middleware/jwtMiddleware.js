const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside jwt middleware");
  console.log(req.headers);
  try {
    const token = req.headers.authorization.slice(7);
    console.log(token);
    const jwtVerification = jwt.verify(token, process.env.jwtkey);
    console.log(jwtVerification);
    req.payload = jwtVerification.email;
    req.id=jwtVerification.id
  } catch (err) {
    return res.status(401).json("Autorization error"+err)
  }
  next();
};

module.exports = jwtMiddleware;
