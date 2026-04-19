require("dotenv").config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require("mongoose")

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err))

const indexRouter = require('./routes/index')
const cameraRoutes = require('./routes/cameraRoutes')
const companyRoutes = require('./routes/companyRoutes')
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// ========================
// ROUTES
// ========================
app.use('/', indexRouter)
app.use('/api/cameras', cameraRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)

// ========================
// 404 HANDLER
// ========================
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// ========================
// ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
    message: err.message || "Server Error"
    });
});

module.exports = app;