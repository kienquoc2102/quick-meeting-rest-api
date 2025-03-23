const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authController = {
    register: async(req, res) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashed = await bcryptjs.hash(req.body.password, salt)

            const newUser = await new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hashed
            })

            const user = await newUser.save()
            res.status(200).json(user)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },

    login: async(req, res)=> {
        try {
            if (!req.body.email || !req.body.password)
                return res.status(400).json("Missing email or password")
            
            const user = await User.findOne({email: req.body.email})
            if (!user)
                return res.status(404).json("Wrong email")

            const validPassword = await bcryptjs.compare(req.body.password, user.password)
            if (!validPassword)
                return res.status(400).json("Wrong password")

            const accessToken = authController.generateAccessToken(user)
            const {password, ...others} = user._doc

            res.status(200).json({...others, accessToken})
        }
        catch (error) {
            res.status(500).json(error)
        }
    },

    generateAccessToken: (user) => {
        return jwt.sign({
            _id: user._id
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn: "1d"}
        )
    }
}

module.exports = authController