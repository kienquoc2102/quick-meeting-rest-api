const jwt = require('jsonwebtoken')

const middlewareController = {
    verifyToken: (req,res,next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user)=>{
                if (err) {
                    res.status(403).json("Token is not invalid")
                }
                req.user = user;
                next()
            })
        }
        else {
            res.status(403).json("You're not authentication")
        }
    }
}

module.exports = middlewareController