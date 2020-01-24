class GamePadDrivingController extends Base
{
    constructor(gamePadLib, eventBus)
    {
        super();
        this.gamePadLib = gamePadLib;
        this.eventBus = eventBus;
        this.currentSpeed = 0;
        this.currentTurn = 0;
        this.changed = false;
    }

    init()
    {
        this.gamePadLib.subscribe('onGamepadConnected', (gamepad)=>{
            console.log('onGamepadConnected', gamepad);
        });
        this.gamePadLib.subscribe('onButtonDown', (btn)=>{
            console.log('onButtonDown', btn);
        });
        this.gamePadLib.subscribe('onButtonUp', (btn)=>{
            console.log('onButtonUp', btn);
        });
        this.gamePadLib.subscribe('onAxesChange', (data)=>{
        //this.gamePadLib.subscribe('onAxesCheck', (data)=>{
            let value = Math.round(100 * data.value);
            if (data.idx === 5){
                this.setEnginePower(value);
            } else if( data.idx === 0) {
                this.setTurnStrength(value);
            }
        });

        this.gamePadLib.init();
    }

    shouldSend()
    {
        let shouldSendData = this.changed || this.currentSpeed !== 0 || this.currentTurn !== 0;
        this.changed = false;

        return shouldSendData;
    }

    getEnginePower()
    {
        return this.currentSpeed;
    }
    
    getTurnStrength()
    {
        return this.currentTurn;
    }

    setEnginePower(power)
    {
        //console.log('power', power);
        this.changed = true;
        this.currentSpeed = power;
        this.eventBus.publish('changeSpeed', power);
    }

    setTurnStrength(turn)
    {
        //console.log('turn', turn);
        this.changed = true;
        this.currentTurn = turn;
        this.eventBus.publish('changeTurn', turn);
    }
}
