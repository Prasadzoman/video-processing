const path = require('path');
const Video = require('../models/Video');
const Job = require('../models/Job');
const videoQueue = require('../queues/videoQueue');

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const userId = req.user?.id || "665fb27e1f0a91f792b6a111";

    const video = new Video({
      user: userId,
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
    await video.save();

    const inputPath = path.join(__dirname, '..', 'uploads', file.filename);
    const originalName = file.originalname;

    // 🔍 DEBUG before saving
    console.log('Job inputPath:', inputPath);
    console.log('Job originalName:', originalName);

    const job = new Job({
      user: userId,
      video: video._id,
      originalName,
      inputPath,
      status: 'queued',
      output: {}
    });

    await job.save();

    await videoQueue.add({ videoId: video._id, inputPath });

    res.status(201).json({
      message: 'Video uploaded and job queued',
      videoId: video._id,
      jobId: job._id,
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
