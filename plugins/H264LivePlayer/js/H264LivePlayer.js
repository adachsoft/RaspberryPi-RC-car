class H264LivePlayer
{
    

    init()
    {
        var canvas = document.getElementById("webCamera");

        // Create h264 player
        var uri = "ws://" + document.location.host + ':8080';
        var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
        wsavc.connect(uri);
        //expose instance for button callbacks
        window.wsavc = wsavc;
    }
}
