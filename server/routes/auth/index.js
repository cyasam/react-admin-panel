const jwt = require("jsonwebtoken");

const isAuthenticated = req => {
  const { username, password } = req.body;
  if (username === "test" && password === "1234") {
    return true;
  }

  return false;
};

const createToken = () => {
  const payload = {
    sub: process.env.USERID
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 60
  });

  return token;
};

module.exports = server => {
  const routeUrl = "/auth";
  server.post(`${routeUrl}/login`, (req, res, next) => {
    if (isAuthenticated(req)) {
      const token = createToken();

      res.send({ success: true, isAuth: true, token });
      res.end();
    } else {
      res.sendStatus(401);
    }
  });
};
