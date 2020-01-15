module.exports = class Vehicle
{
    constructor()
    {
        this.callBackMotorStop = null;
        this.callBackTurnStop = null;
    }

    setOnMotorStop(callBackMotorStop)
    {
        this.callBackMotorStop = callBackMotorStop;
    }

    onMotorStop()
    {
        if (typeof this.callBackMotorStop === 'function') {
            this.callBackMotorStop();
        }
    }

    setOnTurnStop(callBackTurnStop)
    {
        this.callBackTurnStop = callBackTurnStop;
    }

    onTurnStop()
    {
        if (typeof this.callBackTurnStop === 'function') {
            this.callBackTurnStop();
        }
    }
}