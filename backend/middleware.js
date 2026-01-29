const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {
    authMiddleware
};
