const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = (req, res, next) => {
  try {
    console.log("middleware testing");
    console.log("header with auth: ", req.headers.authorization);
    console.log("header: ", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.headers.authorization;
    console.log("middleware token:", token);

    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    );

    console.log("contents of the verified token: ", verifiedToken);
    req.userId = verifiedToken.id;
    console.log("the requserid is:", req.userId);

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, data: err.message, msg: "invalid token" });
  }
};

module.exports = jwtAuth;
