module.exports = class GamePad
{
    constructor()
    {
        this.config = require('../config/GamePad.json');
        this.gamePad = require("gamepad");
        this.pluginManager = null;
        this.shouldSendData = false;
        this.speed = 0;
        this.turn = 0;
        this.watchdogTime = null;
    }

    onInit()
    {
        this.gamePad.init();

        // Create a game loop and poll for events
        setInterval(this.gamePad.processEvents, 16);
        // Scan for new gamepads as a slower rate
        setInterval(this.gamePad.detectDevices, 500);

        // Listen for button up events on all gamepads
        this.gamePad.on("up", (id, num) => {
            this.onGamePadUp(id, num);
        });
        this.gamePad.on("down", (id, num) => {
            this.onGamePadDown(id, num);
        });
        this.gamePad.on("move", (id, axis, value) => {
            this.onGamePadMove(id, axis, value);
        });
        this.gamePad.on("attach", (id, s) => {
            console.log('attach', id, s);
        });
        this.gamePad.on("remove", (id) => {
            console.log('remove', id);
        });
    }

    setPluginManager(pluginManager)
    {
        this.pluginManager = pluginManager;
        this.drivingControlLoop();
    }

    onConnection(ws, req)
    {
    }

    onMessage(data)
    {
        data = this.getDataFromMessage(data);
    }

    onSend()
    {
        return null;
    }

    onClose(ws)
    {
    }

    getDataFromMessage(data)
    {
        return data['plugins']['GamePad'];
    }

    onGamePadUp(id, num)
    {
        this.shouldSendData = false;
        console.log(id, ' ', num);
    }

    onGamePadDown(id, num)
    {
        this.shouldSendData = true;
        console.log(id, ' ', num);
    }

    onGamePadMove(id, axis, value)
    {
        this.watchdog(300);
        console.log(id, axis, value);
        if (1 === axis){
            this.speed = Math.round(value * 100);
        } else if (2 === axis) {
            this.turn = Math.round(value * 100);
        }
    }

    drivingControlLoop()
    {
        if (this.shouldSendData) {
            this.pluginManager.onChangeDrivingData(this.speed, this.turn);
        }

        setTimeout(()=>{
            this.drivingControlLoop();
        }, this.config.duration);
    }

    watchdog(timeOut)
    {
        this.shouldSendData = true;
        clearTimeout(this.watchdogTime);
        this.watchdogTime = null;

        this.watchdogTime = setTimeout(()=>{
            this.shouldSendData = false;
            this.watchdogTime = null;
        }, timeOut);
    }
}