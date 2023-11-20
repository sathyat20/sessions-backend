const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = (req, res, next) => {
  console.log("middleware testing");
  console.log("header: ", req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.headers.authorization;
  console.log("token:", token);
  console.log("middleware token");

  try {
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
