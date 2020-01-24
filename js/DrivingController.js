class DrivingController
{
    constructor(eventBus)
    {
        this.eventBus = eventBus;
        this.arrKeys = [];
        this.currentSpeed = 0;
        this.currentTurn = 0;
    }

    getMaxEnginePower()
    {
        return $('#speed').val();
    }
    
    getMaxTurnStrength()
    {
        return $('#turn').val();
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
        this.currentSpeed = power;
        this.eventBus.publish('changeSpeed', power);
    }
    
    setTurnStrength(turn)
    {
        this.currentTurn = turn;
        this.eventBus.publish('changeTurn', turn);
    }

    shouldSend()
    {
        return  this.arrKeys.indexOf(38) >= 0 || 
                this.arrKeys.indexOf(40) >= 0 ||
                this.arrKeys.indexOf(37) >= 0 ||
                this.arrKeys.indexOf(39) >= 0 ||
                this.arrKeys.indexOf(72) >= 0;
    }

    getFromKeys()
    {
        let speed = 0;
        let turn = 0;
        let bSpeed = false;
        let bTurn = false;
        let speedVal = this.getMaxEnginePower();
        if (this.arrKeys.indexOf(16) >= 0) { //Shift
            speedVal = 100;
        }
        if (this.arrKeys.indexOf(38) >= 0) { //Arrow up
            speed = -1 * speedVal;
            bSpeed = true;
        }
        if (this.arrKeys.indexOf(40) >= 0) { //Arrow down
            speed = 1 * speedVal;
            bSpeed = true;
        }
        if (this.arrKeys.indexOf(37) >= 0) { //Arrow left
            turn = -1 * this.getMaxTurnStrength();
            bTurn = true;
        }
        if (this.arrKeys.indexOf(39) >= 0) { //Arrow right
            turn = 1 * this.getMaxTurnStrength();
            bTurn = true;
        }
        
        if(bSpeed){
            this.setEnginePower(speed);
        }else{
            this.setEnginePower(0);
        }
        if(bTurn){
            this.setTurnStrength(turn);
        }else{
            this.setTurnStrength(0);
        }
    }

    onKeyDown(keyCode, keyboard)
    {
        this.arrKeys = keyboard.getKeys();
        this.getFromKeys();
    }

    onKeyUp(keyCode, keyboard)
    {
        this.arrKeys = keyboard.getKeys();
        this.getFromKeys();
    }
}