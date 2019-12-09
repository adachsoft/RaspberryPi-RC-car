const { isMainThread, parentPort } = require('worker_threads');
if (!isMainThread) {
    const config = require('../config/DS1820.json');
    const sensor = require('ds18b20-raspi');

    setTimeout(()=>{
        checkTemp();
    }, config.duration);

    function checkTemp()
    {
        sensor.readSimpleC((err, temp) => {
            if (err) {
                console.log(err);
            } else {
                parentPort.postMessage(temp);
                setTimeout(()=>{
                    checkTemp();
                }, config.duration);
            }
        });
    }
}