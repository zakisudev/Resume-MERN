require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const personalRoutes = require('./routes/personalInformation.routes');
const workRoutes = require('./routes/workExp.routes');
const educationRoutes = require('./routes/education.routes');
const skillRoutes = require('./routes/skills.routes');
const projectRoutes = require('./routes/project.routes');
const socialRoutes = require('./routes/socialLink.routes');
const summaryRoutes = require('./routes/summary.routes');

// Connect Database
connectDB();
const app = express();
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/personal-info', personalRoutes);
app.use('/api/work-experiences', workRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/social-links', socialRoutes);
app.use('/api/summary', summaryRoutes);

// Listen to the port
app.listen(port, () => console.log(`Server running on port ${port}`));
