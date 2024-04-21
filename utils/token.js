const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    contactNumber: userInfo.contactNumber,
    role: userInfo.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "400days",
  });
  return token;
};

// for crypot generate

// node,  crypto.randomBytes(64).toString("hex")
