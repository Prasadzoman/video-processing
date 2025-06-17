// routes/download.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authenticate = require('../middlewares/authMiddleware'); // JWT middleware
const Job = require('../models/Job'); // Mongoose model for encoding jobs

// @route   GET /api/download/:jobId/:format
// @desc    Download processed video (mp4/webm)
// @access  Private
router.get('/:jobId/:format', authenticate, async (req, res) => {
  const { jobId, format } = req.params;
  const userId = req.user.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.user.toString() !== userId) return res.status(403).json({ error: "Unauthorized" });
    if (job.status !== 'completed') return res.status(400).json({ error: "Video not ready yet" });

    const filePath = job.output[format]; // job.output = { mp4: '...', webm: '...' }
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath); // sends file as attachment
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
