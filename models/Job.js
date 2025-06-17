const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  inputPath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued'
  },
  output: {
    mp4: String,
    webm: String,
    // Add more formats if needed
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
