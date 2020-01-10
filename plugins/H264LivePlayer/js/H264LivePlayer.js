class H264LivePlayer
{
    constructor()
    {
        this.wsavc = null;
        this.containerCtrl = null;
        this.canvas = null;
        this.aspectRatio = 16 / 9;
    }

    init()
    {
        this.containerCtrl = $('.containerCtrl');
        this.canvas = $('#webCamera');

        $(window).resize(() => {
            this.changeSizeOfCanvas(this.containerCtrl.width(), this.containerCtrl.height(), this.aspectRatio);
        });

        this.startServer();
    }

    changeSizeOfCanvas(width, height, aspectRatio = 16 / 9)
    {
        let h = height;
        let w = aspectRatio * height;

        if (w > width) {
            w = width;
            h = aspectRatio * width;
        }
        w = Math.round(w);
        h = Math.round(h);
        console.log('changeSizeOfCanvas', w, h);

        this.canvas.width(w);
        this.canvas.height(h);
    }

    startServer()
    {
        let canvas = document.getElementById("webCamera");

        // Create h264 player
        let uri = "ws://" + document.location.host + ':8080';
        this.wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
        this.wsavc.connect(uri);
        this.wsavc.on('canvasReady', (width, height)=>{
            console.log('canvasReady', width, height);
            this.aspectRatio = width/height;
            this.changeSizeOfCanvas(this.containerCtrl.width(), this.containerCtrl.height(), this.aspectRatio);
            this.wsavc.playStream();
        });
        //expose instance for button callbacks
        window.wsavc = this.wsavc;
    }
}
