const User = require("../models/User")

const router = require("express").Router()

router.post('/', async (req, res) => {
    try {
        const limit = req.body.limit;
        const userId = req.user.userId;

        const history = await User
            .findById(userId)
            .populate({
                path: "feedbacks",
                options: {
                    sort: { createdAt: -1 },
                    limit: limit
                }
            })
            .lean()

        return res.json({
            data: history.feedbacks
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router