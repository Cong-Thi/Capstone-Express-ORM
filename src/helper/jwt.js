const jwt = require("jsonwebtoken");
const EXPIRES_IN = 60 * 60 * 12;
const configs = require("../config")


const generateToken = (payload) => {
  const token = jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
    },
    configs.SECRET_KEY,
    {
      expiresIn: EXPIRES_IN,
    }
  );

  return {
    token,
    expiresIn: EXPIRES_IN,
  };
};

module.exports = {
  generateToken,
};
