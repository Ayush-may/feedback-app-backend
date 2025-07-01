const User = require("../models/User")
const Feedback = require("../models/Feedback")


const router = require("express").Router()

router.post('/', async (req, res) => {
    try {
        const limit = req.body.limit;
        const userId = req.user.userId;

        const feedbacks = await Feedback.query('userId')
            .using('userId-index')
            .eq(userId)
            .sort('descending')
            .limit(limit)
            .exec()

        return res.json({
            data: feedbacks
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router