require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');

// DB connection
require('./config/db'); 

const app = express();

// ✅ FIXED CORS
app.use(cors({
    origin: "https://zentixor.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8081; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});