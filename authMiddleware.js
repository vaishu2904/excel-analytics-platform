const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next){
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }
    const token = parts[1];
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid Token!" });
        }
        req.user = user;
        next();
    });
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
module.exports = {authenticateToken, verifyToken};