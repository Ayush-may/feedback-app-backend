const { default: axios } = require("axios");
const User = require("../models/User");
const Feedback = require("../models/Feedback");

const router = require("express").Router()

router.post('/', async (req, res) => {
    try {
        const text = req.body.text;
        const userId = req.user.userId;

        const user = await User
            .findById(userId)

        const promptText = `
        You are an expert reviewer. The following is a user-submitted text. Please provide clear, constructive, and helpful feedback on:

        1. Grammar and spelling  
        2. Clarity and coherence  
        3. Overall quality and suggestions for improvement  

        Here is the user's text:
        ${text}
        `;

        const data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": promptText
                        }
                    ]
                }
            ]
        }


        const aiResponse = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, { ...data })

        const aiText = aiResponse.data.candidates[0].content.parts[0].text;

        const feedback = Feedback.create({
            userId: user._id,
            user_input: text,
            feedback: aiText,
        })

        return res.json({
            data: aiResponse.data
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router
