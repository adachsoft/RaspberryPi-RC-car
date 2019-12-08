
class Horn
{
    constructor()
    {
        this.hornOn = false;
        this.shouldSendData = false;
    }

    init()
    {
    }

    createDataToSend()
    {
        this.shouldSendData = false;

        return {
            Horn: {
                hornOn: this.hornOn
            }
        };
    }

    shouldSend()
    {
        return this.shouldSendData; 
    }

    onKeyUp(keys)
    {
        if (this.isKeyPressed(keys, 72)) {
            this.hornOn = false;
            this.shouldSendData = true;
        }
    }

    onKeyDown(keys)
    {
        if (this.isKeyPressed(keys, 72)) {
            this.hornOn = true;
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