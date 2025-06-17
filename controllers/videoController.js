const path = require('path');
const Video = require('../models/Video');
const Job = require('../models/Job')
const videoQueue = require('../queues/videoQueue');
const mongoose=require("mongoose")

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const video = new Video({
      user: req.user.id,
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
    await video.save();

    const job = new Job({
      user: req.user.id,
      video: video._id,
      status: 'queued',
      output: {}
    });
    await job.save();

    await videoQueue.add({
      jobId: job._id,
      inputPath: path.join(__dirname, '..', 'uploads', file.filename)
    });

    res.status(201).json({
      message: 'Video uploaded and queued',
      videoId: video._id,
      jobId: job._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// ✅ Add this for status check
exports.getVideoStatus = async (req, res) => {
  try {
    const job = await Job.findOne({
      video: req.params.videoId,
      user: req.user?.id || "665fb27e1f0a91f792b6a111" // Same fallback if needed
    });

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json({ status: job.status });
  } catch (err) {
    console.error('❌ Status error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
