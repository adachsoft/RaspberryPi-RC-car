
class BlinkingLed
{
    constructor()
    {
        this.ledOn = true;
        this.shouldSendData = false;
    }

    init()
    {
    }

    createDataToSend()
    {
        this.shouldSendData = false;

        return {
            BlinkingLed: {
                led: this.ledOn ? 1 : 0
            }
        };
    }

    shouldSend()
    {
        return this.shouldSendData; 
    }

    onKeyUp(keys)
    {
    }

    onKeyDown(keys)
    {
        if( this.isKeyPressed(keys, 65) ){
            this.ledOn = !this.ledOn;
            this.shouldSendData = true;
        }
    }

    onMessage(data)
    {
    }

    isKeyPressed(keys, keyCode)
    {
        return keys.indexOf(keyCode) >= 0;
    }
}