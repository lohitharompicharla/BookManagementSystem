const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization") || ""
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : authHeader

        if (!token) {
            return res.status(401).json({
                message: "Login First"
            })
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        })
    }
}

module.exports = auth
