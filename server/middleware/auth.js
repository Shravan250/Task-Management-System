const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header("x-auth-token");

    // Check if token exists
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user from the token payload to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
