module.exports = class MjpegStreamer
{
    constructor()
    {
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
            if (this.isSuccess(data)) {
                console.error('Success run mjpeg-streamer');
            } else {
                console.error(`stderr: ${data}`);
            }
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

    isSuccess(data)
    {
        //o: HTTP TCP port........: 8080
        let regex = RegExp("HTTP\\sTCP\\sport", 'm');

        return regex.test(data);
    }
}
