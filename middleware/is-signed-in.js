// middleware/is-signed-in.js
const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not Authorised" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded.payload || decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not Authorised" });
  }
};

module.exports = isSignedIn;
