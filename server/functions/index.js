const functions = require("firebase-functions");
const admin=require('./config/firebaseConfig.js')
const express=  require('express');
const cors=require('cors')
const app=express();

const authRoutes = require('./routes/authroutes.js');
const hotelRoutes = require('./routes/hotelroutes.js');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/hotel', hotelRoutes);

exports.api=functions.https.onRequest(app)