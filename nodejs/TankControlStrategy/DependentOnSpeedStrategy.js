module.exports = class DependentOnSpeedStrategy
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
            this.motorSpeedL = speed - this.getTurnStrength(speed);
            this.motorSpeedR = speed;
        }else if (turn > 0){
            this.motorSpeedL = speed;
            this.motorSpeedR = speed - this.getTurnStrength(speed);
        }else{
            this.motorSpeedL = speed;
            this.motorSpeedR = speed;
        }
    }

    getTurnStrength(speed)
    {
        speed = Math.abs(speed);
        if (speed < 0.3) {
            return 0;
        }
        if (speed < 0.5) {
            return 0.2;
        }
        if (speed < 0.7) {
            return 0.5;
        }

        return 0.8;
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