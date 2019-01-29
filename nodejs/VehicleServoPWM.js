/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const pwm = require('raspi-soft-pwm');
const Gpio = require('pigpio').Gpio;

module.exports = class VehicleServoPWM{
    constructor(dataInit) {
        this.pwmMotor0 = new pwm.SoftPWM(dataInit.pinMotor0);
        this.pwmMotor1 = new pwm.SoftPWM(dataInit.pinMotor1);
        this.timeOut = dataInit.timeOut;
        this.servoMin = dataInit.servoMin;
        this.servoMax = dataInit.servoMax;
        this.servo = new Gpio(dataInit.pinServo, {mode: Gpio.OUTPUT});
        this.motorTime = null;
        this.turnTime = null;
        this.turnReset();
    }
    
    turn(val){
        val = this.servoMin + (this.servoMax - this.servoMin) * ((100 + parseInt(val)) / 200);
        this.servo.servoWrite(val);
        if( this.turnTime ){
            clearTimeout(this.turnTime);
            this.turnTime = null;
        }
        this.turnTime = setTimeout(()=>{
            //console.log('STOP turn: ' + servoVal);
            /*let servoVal = this.servoMin + (this.servoMax - this.servoMin)/2;
            console.log('STOP turn: ' + servoVal);
            this.servo.servoWrite( servoVal );*/
            this.turnReset();
            this.turnTime = null;
        }, this.timeOut);
    }
    
    turnReset(){
        let servoVal = this.servoMin + (this.servoMax - this.servoMin)/2;
        console.log('STOP turn: ' + servoVal);
        this.servo.servoWrite( servoVal );
    }
    
    motor(val){
        console.log('START MOTOR: ' + val);
        val = (parseInt(val) / 100);
        this.pwmVal(this.pwmMotor0, this.pwmMotor1, val);
        if( this.motorTime ){
           clearTimeout(this.motorTime);
           this.motorTime = null;
        }
        this.motorTime = setTimeout(()=>{
            console.log('STOP MOTOR: ' + val);
            this.pwmMotor0.write(0.0);
            this.pwmMotor1.write(0.0);
            this.motorTime = null;
        }, this.timeOut);
    }

    pwmVal(pwm0, pwm1, val){
        if( val >= 0 ){
            pwm0.write(0);
            pwm1.write(val);
        }else{
            pwm0.write(1);
            pwm1.write(-1 * val);
        }
    }
}
