const jwt = require("jsonwebtoken")

const identifyUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: "Token not provided, Unauthorized access."
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        res.status(401).json({
            message: "User not authorized."
        })
    }

    req.user = decoded
    next()
}

module.exports = identifyUser