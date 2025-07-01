const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User')

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/feedback', require('./middlewares/authMiddleware'), require('./routes/feedback'));
app.use('/api/history', require('./middlewares/authMiddleware'), require('./routes/history'));
app.use('/api/auth/validate', require('./routes/validate'));

app.listen(5000, async () => {
    console.log('Listening on port 5000')
});

// mongoose.connect(process.env.MONGO_URI).then(() => {
//     console.log('MongoDB is connected')
// });
