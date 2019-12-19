class Keyboard extends Base
{
    constructor()
    {
        super();
        this.arrKeys = [];
        this.listeners = [];
    }

    init()
    {
        $(document).on("keyup", (e)=>{
            let index = this.arrKeys.indexOf(e.keyCode);
            if (index > -1) {
              this.arrKeys.splice(index, 1);
              this.onKeyUp(e.keyCode);
            }
        });
        $(document).on("keydown", (e)=>{
            if (this.arrKeys.indexOf(e.keyCode) < 0) {
                this.arrKeys.push(e.keyCode);
                this.onKeyDown(e.keyCode);
            }
        });
    }

    isKeyPressed(keyCode)
    {
        return this.arrKeys.indexOf(keyCode) >= 0;
    }

    addEventListener(listener)
    {
        this.listeners.push(listener);
    }

    getKeys()
    {
        return this.arrKeys;
    }

    onKeyDown(keyCode)
    {
        this.listeners.forEach((listener)=>{
            if (listener.onKeyDown && typeof listener.onKeyDown === "function") {
                listener.onKeyDown(keyCode, this);
            }
        });
    }

    onKeyUp(keyCode)
    {
        this.listeners.forEach((listener)=>{
            if (listener.onKeyUp && typeof listener.onKeyUp === "function") {
                listener.onKeyUp(keyCode, this);
            }
        });
    }
}