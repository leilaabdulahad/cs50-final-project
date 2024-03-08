import jwt from "jsonwebtoken";
// Middleware function to verify the token
export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from Authorization header
    let token = req.header("Authorization");

    // If token not present
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    // If token starts with Bearer, remove prefix
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // Verify token using secret key 
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
