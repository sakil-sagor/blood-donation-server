const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Donor = require("../models/Donor");
/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1];
        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "You are not logged in"
            });
        }
        // jwt ekti cl back func return kore tai node er ekti core module pormisify use kore etake pormise kora hoy 
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
        if (decoded.role !== "admin") {
            return res.status(401).json({
                status: "fail",
                error: "You are a thief, Fuck you!"
            });
        }
        req.user = decoded;
        next();

    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Invalid token"
        });
    }
};