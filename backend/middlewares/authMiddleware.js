const jwt = require("jsonwebtoken");
const db = require("../db/index");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let user = await db.query("SELECT * FROM users WHERE id = $1", [
        decoded.id,
      ]);

      user = user.rows[0];

      const authenticatedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      req.user = authenticatedUser;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let user = await db.query("SELECT * FROM users WHERE id = $1", [
        decoded.id,
      ]);

      user = user.rows[0];

      const authenticatedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      req.userId = authenticatedUser?.id;
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = {
  protect,
  auth,
};
