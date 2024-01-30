require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const personalRoutes = require('./routes/personalInformation.routes');
const workRoutes = require('./routes/workExp.routes');
const educationRoutes = require('./routes/education.routes');
const skillRoutes = require('./routes/skill.routes');
const projectRoutes = require('./routes/project.routes');

// Connect Database
connectDB();
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/personal-info', personalRoutes);
app.use('/api/work-experiences', workRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

// Listen to the port
app.listen(port, () => console.log(`Server running on port ${port}`));
