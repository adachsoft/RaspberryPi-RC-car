"use strict";

const util      = require('util');
const spawn     = require('child_process').spawn;

module.exports = class Raspivid
{
    constructor(width, height, fps)
    {
        this.options = {
            width: width,
            height: height,
            fps: fps
        };

        this.streamer = null;
    }

    getStream() 
    {
        if(this.streamer){
            return this.streamer.stdout;
        }

        let cmd = util.format(
            "raspivid -t 0 -o - -w %d -h %d -fps %d", 
            this.options.width, 
            this.options.height, 
            this.options.fps
        );
        console.log(cmd);
        this.streamer = spawn('raspivid', ['-t', '0', '-o', '-', '-w', this.options.width, '-h', this.options.height, '-fps', this.options.fps, '-pf', 'baseline']);
        this.streamer.on("exit", (code) => {
            console.log("Failure", code);
        });

        return this.streamer.stdout;
    }
    
    close()
    {
        if (this.streamer) {
            this.streamer.kill();
            this.streamer = null;
        }
    }

    getWidth()
    {
        return this.options.width;
    }

    getHeight()
    {
        return this.options.height;
    }
}
