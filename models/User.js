const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ""},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)

