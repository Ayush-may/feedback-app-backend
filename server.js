const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/feedback', require('./middlewares/authMiddleware'), require('./routes/feedback'));
app.use('/api/history', require('./middlewares/authMiddleware'), require('./routes/history'));
app.use('/api/auth/validate', require('./routes/validate'));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected')
    app.listen(5000, () => console.log("Server running on 5000"));
});
