const Queue = require('bull');

const videoQueue = new Queue('video-processing', {
  redis: { host: '127.0.0.1', port: 6379 }
});

module.exports = videoQueue;
