const { Admin } = require("../db/db");

const adminMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;
  Admin.findOne({
    username,
    password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).json({
        message: "Admin doesn't exsists",
      });
    }
  });
};
module.exports = adminMiddleware;
