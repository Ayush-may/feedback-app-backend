const router = require('express').Router()
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    const token = req.body.token
    if (!token) return res.status(401).json({ message: "Token invalid or expired" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Token is verified" });
    } catch {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
});

module.exports = router