const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); // Ensure this file exists

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stepone';

// Middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
                styleSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            },
        },
    })
);
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
