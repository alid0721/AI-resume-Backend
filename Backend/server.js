require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const app=express();
const path = require('path');
const fs=require('fs');

const authRoutes = require('./controllers/auth.routes.js')
const testJwtRouter= require('./controllers/test-jwt.js')
const verifyToken= require('./middleware/verify-token.js')
const jobListRouter=require('./controllers/JobList.js')
// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

//Routes
app.use('/auth',authRoutes)
app.use('/test-jwt',verifyToken,testJwtRouter)
app.use('/Jobs',verifyToken,jobListRouter)
app.listen(port,()=>{
  console.log('The express app is ready')
})