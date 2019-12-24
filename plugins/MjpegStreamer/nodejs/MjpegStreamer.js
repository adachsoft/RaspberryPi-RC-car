module.exports = class MjpegStreamer
{
    constructor()
    {
        console.log('MjpegStreamer');
        
    }

    onInit()
    {
        const { spawn } = require('child_process');
        const mjpegStreamer = spawn('../sh/mjpeg-streamer.sh');

        mjpegStreamer.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        mjpegStreamer.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        mjpegStreamer.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    /*const ls = spawn('/usr/local/bin/mjpg_streamer', [
            '-i',
            "'input_uvc.so -r 320x240 -d /dev/video0 -f 30'",
            '-o',
            "'output_http.so -p 8080 -w /usr/local/share/mjpg-streamer/www'"
        ], {env: {LD_LIBRARY_PATH:'/usr/local/bin/mjpg_streamer'}});*/
}