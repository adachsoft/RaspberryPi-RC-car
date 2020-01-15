'use strict';

const statistics = require('math-statistics');
const usonic     = require('mmm-usonic');

module.exports = class USonic
{
    constructor()
    {
        this.config = require('../config/USonic.json');
        this.distances = null;
        this.distance = -1;
        this.sensor = null;
        this.statistics = require('math-statistics');
    }

    onInit()
    {
        usonic.init((error) => {
            if (error) {
                console.log(error);
            } else {
                this.initSensor({
                    echoPin: this.config.pinEcho,
                    triggerPin: this.config.pinTrigger,
                    timeout: this.config.measurementTimeout,
                    delay: this.config.measurementDelay,
                    rate: this.config.rate
                });
            }
        });
    }

    onSend()
    {
        return {
            distance: this.distance,
        };
    }

    calculate() 
    {
        let distance = statistics.median(this.distances);
        if (distance < 0) {
            console.log('Error: Measurement timeout.');
        } else {
            this.distance = distance.toFixed(2);
        }
    }

    print() 
    {
        if (this.distance < 0) {
            process.stdout.write('Error: Measurement timeout.\n');
        } else {
            process.stdout.write('Distance: ' + this.distance + ' cm');
        }
    }

    initSensor(config) 
    {
        this.sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);
        this.measure(config);
    }

    measure(config)
    {
        if (!this.distances || this.distances.length === config.rate) {
            if (this.distances) {
                this.calculate();
            }

            this.distances = [];
        }

        setTimeout(() => {
            this.distances.push(this.sensor());

            this.measure(config);
        }, config.delay);
    }
}
