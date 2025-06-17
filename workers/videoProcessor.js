const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const Video = require('../models/Video');
const videoQueue = require('../queues/videoQueue');

ffmpeg.setFfmpegPath(ffmpegPath);

videoQueue.process(async (job, done) => {
  const { videoId, inputPath } = job.data;
  const outputDir = path.join(__dirname, '../processed');

  try {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    await Video.findByIdAndUpdate(videoId, { status: 'processing' });

    const mp4Output = path.join(outputDir, `${videoId}.mp4`);
    const webmOutput = path.join(outputDir, `${videoId}.webm`);

    // MP4
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath).output(mp4Output).on('end', resolve).on('error', reject).run();
    });

    // WebM
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath).output(webmOutput).on('end', resolve).on('error', reject).run();
    });

    await Video.findByIdAndUpdate(videoId, { status: 'completed' });
    console.log(`✅ Video ${videoId} processed successfully`);
    done();
  } catch (err) {
    console.error('❌ Processing error:', err);
    await Video.findByIdAndUpdate(videoId, { status: 'failed' });
    done(new Error('Processing failed'));
  }
});
