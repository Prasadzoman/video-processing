// worker.js



const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Worker connected to MongoDB');
  require('./workers/videoProcessor');
  console.log('🎬 Video worker started...');
}).catch(err => {
  console.error('❌ Worker MongoDB connection error:', err);
});


