const jwt = require("jsonwebtoken");


exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3days"
    })
    return token;
}






// for crypot generate

// node,  crypto.randomBytes(64).toString("hex")  