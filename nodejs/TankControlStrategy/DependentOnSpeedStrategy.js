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
            this.motorSpeedL = this.getTurnStrength(speed);
            this.motorSpeedR = speed;
        }else if (turn > 0){
            this.motorSpeedL = speed;
            this.motorSpeedR = this.getTurnStrength(speed);
        }else{
            this.motorSpeedL = speed;
            this.motorSpeedR = speed;
        }
    }

    getTurnStrength(speed)
    {
        let isNegative = speed < 0 ? speed : -speed;
        speed = Math.abs(speed);
        if (speed < 0.3) {
            return isNegative * 0.3;
        }
        if (speed < 0.5) {
            return isNegative * 0.4;
        }
        if (speed < 0.7) {
            return isNegative * 0.5;
        }

        return isNegative * 0.6;
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