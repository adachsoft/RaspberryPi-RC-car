const pwm = require('raspi-soft-pwm');
const Vehicle = require('./Vehicle.js');

module.exports = class VehicleL298n extends Vehicle
{
    constructor(dataInit) 
    {
        super();
        this.pwmMotor0 = new pwm.SoftPWM(dataInit.pinMotor0);
        this.pwmMotor1 = new pwm.SoftPWM(dataInit.pinMotor1);
        this.pwmTurn0 = new pwm.SoftPWM(dataInit.pinTurn0);
        this.pwmTurn1 = new pwm.SoftPWM(dataInit.pinTurn1);
        this.timeOut = dataInit.timeOut;
        this.motorTime = null;
        this.turnTime = null;
    }

    turn(val)
    {
        val = val / 100;
        this.pwmVal(this.pwmTurn0, this.pwmTurn1, val);
        if( this.turnTime ){
            clearTimeout(this.turnTime);
            this.turnTime = null;
        }
        this.turnTime = setTimeout(()=>{
            this.pwmTurn0.write(0.0);
            this.pwmTurn1.write(0.0);
            this.turnTime = null;
            this.onTurnStop();
        }, this.timeOut);
    }

    motor(val)
    {
        val = (parseInt(val) / 100);
        this.pwmVal(this.pwmMotor0, this.pwmMotor1, val);
        if( this.motorTime ){
           clearTimeout(this.motorTime);
           this.motorTime = null;
        }
        this.motorTime = setTimeout(()=>{
            this.pwmMotor0.write(0.0);
            this.pwmMotor1.write(0.0);
            this.motorTime = null;
            this.onMotorStop();
        }, this.timeOut);
    }

    pwmVal(pwm0, pwm1, val)
    {
        if( val >= 0 ){
            pwm0.write(val);
            pwm1.write(0);
        }else{
            pwm0.write(0);
            pwm1.write(-1 * val);
        }
    }
}
