module.exports = class SimpleStrategy
{
    constructor()
    {
        this.motorSpeedL = 0;
        this.motorSpeedR = 0;
    }

    calculate(speed, turn)
    {
        if (0 === speed){
            this.motorSpeedL = -turn;
            this.motorSpeedR = turn;
        }else if (turn < 0){
            this.motorSpeedL = 0;
            this.motorSpeedR = speed;
        }else if (turn > 0){
            this.motorSpeedL = speed;
            this.motorSpeedR = 0;
        }else{
            this.motorSpeedL = speed;
            this.motorSpeedR = speed;
        }
    }

    getMotorSpeedL()
    {
        return this.motorSpeedL;
    }

    getMotorSpeedR()
    {
        return this.motorSpeedR;
    }
}