// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// App Setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Basic route to confirm server is working
app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

// Import and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ ADD this line to enable /api/tasks endpoint
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // deprecated but okay for now
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });


