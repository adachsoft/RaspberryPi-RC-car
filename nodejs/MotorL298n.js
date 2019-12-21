const pwm = require('raspi-soft-pwm');

module.exports = class MotorL298n
{
    constructor(pinA, pinB)
    {
        this.pwmPinA = new pwm.SoftPWM(pinA);
        this.pwmPinB = new pwm.SoftPWM(pinB);
    }

    setSpeed(speed)
    {
        speed = Math.max(Math.min(speed, 1), -1);
        try{
            if (speed >= 0) {
                this.pwmPinA.write(Math.abs(speed));
                this.pwmPinB.write(0);
            }else{
                this.pwmPinA.write(0);
                this.pwmPinB.write(Math.abs(-1 * speed));
            }
        } catch(e) {
            console.log(e, 'SPEED VALUE: ', speed, Math.abs(speed));
        }
    }
}