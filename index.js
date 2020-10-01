const { spawn } = require('child_process')
require('dotenv').config()

// Server
require('./server/server')

// Worker
const workerProcess = spawn('node', ['server/worker.js'])

workerProcess.stdout.on('data', (data) => {
  process.stdout.write(data.toString());
});

workerProcess.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
});
