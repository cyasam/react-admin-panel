const jwt = require("jsonwebtoken");

const verifyToken = token => {
  return jwt.verify(token, process.env.SECRET_KEY, (err, decode) => !!decode);
};

const isAuthorized = req => {
  const token = req.headers.authorization.split(" ")[1];
  const verified = verifyToken(token);

  if (verified) {
    return true;
  }
  return false;
};

module.exports = (server, router) => {
  const routeUrl = "/api";
  server.use(routeUrl, (req, res, next) => {
    const status = 401;
    const message = "Your authentication is expired. Please login again.";

    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      res.status(status).json({ status, message });
      return;
    }

    if (isAuthorized(req)) {
      next();
    } else {
      res.status(status).json({ status, message });
    }
  });
  server.use(routeUrl, router);
};
