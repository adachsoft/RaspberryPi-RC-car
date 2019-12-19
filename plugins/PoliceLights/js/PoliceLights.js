class PoliceLights
{
    constructor()
    {
        this.ledOn = true;
        this.shouldSendData = false;
        $(document).ready(()=>{
            this.div = $('#PoliceLights');
        });
    }

    init()
    {
    }

    createDataToSend()
    {
        this.shouldSendData = false;

        return {
            PoliceLights: {
                ledOn: this.ledOn ? 1 : 0
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
        if( this.isKeyPressed(keys, 66) ){
            this.ledOn = !this.ledOn;
            this.shouldSendData = true;
            this.setColor();
        }
    }

    onMessage(data)
    {
    }

    isKeyPressed(keys, keyCode)
    {
        return keys.indexOf(keyCode) >= 0;
    }

    setColor()
    {
        if( this.ledOn ){
            this.div.css({color: 'green'});
        }else{
            this.div.css({color: 'red'});
        }
    }
}