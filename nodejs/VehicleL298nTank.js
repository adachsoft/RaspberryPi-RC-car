const pwm = require('raspi-soft-pwm');
const MotorL298n = require('./MotorL298n.js');

module.exports = class VehicleL298nTank
{
    constructor(config)
    {
        this.motorL = new MotorL298n(config.pinMotorL0, config.pinMotorL1);
        this.motorR = new MotorL298n(config.pinMotorR0, config.pinMotorR1);
        this.timeOut = config.timeOut;
        this.turnValue = 0;
        this.motorTime = null;
    }

    turn(val)
    {
        this.turnValue = (parseInt(val) / 100);
        //this.turnValue = val;
        /*if (null === this.motorTime) {
            this.motorL.setSpeed(-val);
            this.motorR.setSpeed(val);
        }*/
    }

    motor(val)
    {
        val = (parseInt(val) / 100);
        
        if (0 === val){
            console.log('-----------------------turnValue: ', this.turnValue);
            this.motorL.setSpeed(-this.turnValue);
            this.motorR.setSpeed(this.turnValue);
        }else if (this.turnValue < 0){
            this.motorL.setSpeed(0);
            this.motorR.setSpeed(val);    
        }else if (this.turnValue > 0){
            this.motorL.setSpeed(val);
            this.motorR.setSpeed(0);
        }else{
            this.motorL.setSpeed(val);
            this.motorR.setSpeed(val);
        }
        
        if (this.motorTime) {
            clearTimeout(this.motorTime);
            this.motorTime = null;
        }
        this.motorTime = setTimeout(()=>{
            this.motorL.setSpeed(0);
            this.motorR.setSpeed(0);
            this.motorTime = null;
        }, this.timeOut);
    }


}
