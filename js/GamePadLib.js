class GamePadLib extends EventBus
{
    constructor()
    {
        super();
        this.scanInterval = null;
        this.buttons = [];
        this.axes = {};
    }

    isAvailable()
    {
		return "getGamepads" in navigator;
    }
    
    init()
    {
        $(window).on("gamepadconnected", (e) => {
            super.publish('onGamepadConnected', e.originalEvent.gamepad);
            
            this.scanInterval = window.setInterval(() => {
                let gamepad = navigator.getGamepads()[0];
                this.scanGamepad(gamepad);
            }, 100);
        });

        $(window).on("gamepaddisconnected", () => {
            super.publish('onGamepadDisconnected');
            window.clearInterval(this.scanInterval);
        });
    }

    scanGamepad(gamepad) 
    {
		for(let i=0; i < gamepad.buttons.length; i++) {
            let pressed = gamepad.buttons[i].pressed;
            if (pressed && !this.isButtonDown(i)) {
                this.buttons.push(i);
                super.publish('onButtonDown', i);
            } else if (!pressed && this.isButtonDown(i)) {
                this.buttons.splice(this.buttons.indexOf(i), 1);
                super.publish('onButtonUp', i);
            }
		}
        
        for(let i = 0; i < gamepad.axes.length; i++) {
            let idx = i;
            let value = gamepad.axes[i];
            if (typeof this.axes[idx] === 'undefined' || this.axes[idx].value !== value) {
                this.axes[idx] = {
                    value: value,
                };
                super.publish('onAxesChange', {idx: idx, value: value});
            }
            super.publish('onAxesCheck', {idx: idx, value: value});
		}
        
		/*for(let i = 0; i < gamepad.axes.length; i+=2) {
            let idx = Math.ceil(i/2);
            let x = gamepad.axes[i];
            let y = gamepad.axes[i + 1];
            if (typeof this.axes[idx] === 'undefined' || this.axes[idx].x !== x || this.axes[idx].y !== y) {
                this.axes[idx] = {
                    x: x,
                    y: y
                };
                super.publish('onAxesChange', {idx: idx, x: x, y: y});
            }
		}*/
    }
    
    isButtonDown(btn)
    {
        return this.buttons.indexOf(btn) >= 0;
    }
}
