module.exports = class MjpegStreamer
{
    constructor()
    {
        console.log('MjpegStreamer');
        this.mjpegStreamer = null;
    }

    onInit()
    {
        const { spawn } = require('child_process');
        this.mjpegStreamer = spawn('../plugins/MjpegStreamer/sh/mjpeg-streamer.sh');

        this.mjpegStreamer.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        this.mjpegStreamer.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        this.mjpegStreamer.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    onExit()
    {
        console.log('Kill: mjpeg-streamer');
        if (!this.mjpegStreamer.kill('SIGTERM')) {
            console.log('Error kill mjpeg-streamer');
        }
    }
}
