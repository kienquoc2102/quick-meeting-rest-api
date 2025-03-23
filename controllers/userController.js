const User = require("../models/User")

const userController = {
    getFriend: async(req, res) => {
        try {
            const user = await User.findById(req.body._id).populate("friends", "fullname username avatar")
            res.json(user.friend)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },  

    addFriend: async (req, res) => {
        try {
            const friendId = req.body.friendId
            const myID = req.body.myID

            if (!friendId) return res.status(400).json("Missing friendId")

            const user = await User.findById(myID);
            if (!user) return res.status(404).json("User not found")

            const friend = await User.findById(friendId);
            if (!friend) return res.status(404).json("Friend not found")

            if (user.friends.includes(friendId)) return res.status(400).json("You were already friends")

            user.friends.push(friendId)
            friend.friends.push(user._id)
    
            await user.save()
            await friend.save()
    
            res.json("Add friend success")
        } catch (err) {
            console.error("Error in addFriend:", err)
            res.status(500).json({ message: err.message })
        }
    },

    searchUser: async(req, res) => {
        try {
            const keyword = req.query.keyword
            if (!keyword) return res.status(400).json("Missing search keyword")
            
            const users = await User.find({
                $or: [
                    {username: {$regex: keyword, $options: "i"}},
                    {fullname: {$regex: keyword, $options: "i"}}
                ]
            }).select("fullname username avatar")

            res.status(200).json(users)
        } catch (err) {
            console.error("Error:", err)
            res.status(500).json({message: err.message})
        }
    }, 
}

module.exports = userController