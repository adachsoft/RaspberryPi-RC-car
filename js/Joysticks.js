class Joysticks
{
    constructor()
    {
        this.joystickOnX = false;
        this.joystickOnY = false;
    }

    init()
    {
        console.log('initJoysticks');
        this.joystickL = nipplejs.create({
            zone: document.getElementById('left'),
            mode: 'static',
            position: { left: '120px', top: '50%' },
            color: 'green',
            size: 200
        });
        this.joystickR = nipplejs.create({
            zone: document.getElementById('right'),
            mode: 'static',
            position: { left: '80%', top: '50%' },
            color: 'red',
            size: 200
        });

        this.joystickL.on('start', (evt, data) => {
            console.log( 'START L');
            this.joystickOnX = true;
        });

        this.joystickL.on('end', (evt, data) => {
            this.joystickOnX = false;
            $('#current_turn').val( 0 );
        });

        this.joystickL.on('move', (evt, data) => {
            //console.log( 'L: ' + JSON.stringify(data) );
            console.log( 'L: ' + JSON.stringify(data.instance.frontPosition) );
            if( data.instance.frontPosition.x > 10 ){
                $('#current_turn').val( $('#turn').val() ).trigger('change');
            }else if( data.instance.frontPosition.x < -10 ){
                $('#current_turn').val( -1 * $('#turn').val() ).trigger('change');
            }else{
                $('#current_turn').val(0).trigger('change');
            }
            //$('#current_turn').val( data.instance.frontPosition.x );
        });

        this.joystickR.on('start', function (evt, data) {
            console.log( 'START');
            this.joystickOnY = true;
        });

        this.joystickR.on('end', function (evt, data) {
            //console.log( 'END');
            //console.log( 'SL: ' + JSON.stringify(data) );
            //$('#current_turn').val( 0 );
            $('#current_speed').val( 0 ).trigger('change');
            this.joystickOnY = false;
        });

        this.joystickR.on('move', function (evt, data) {
            //console.log( 'L: ' + JSON.stringify(data) );
            //console.log( 'L: ' + JSON.stringify(data.instance.frontPosition) );
            //$('#current_turn').val( data.instance.frontPosition.x );
            $('#current_speed').val( data.instance.frontPosition.y ).trigger('change');
        });
    }

    /*initButtons()
    {
        $('#btnUp').on('mousedown touchstart', (e)=>{
            this.setEnginePower(-1 * this.getMaxEnginePower());
        });
        $('#btnUp').on('mouseup touchend', (e)=>{
            this.setEnginePower(0);
        });
        
        $('#btnDown').on('mousedown touchstart', (e)=>{
            this.setEnginePower(1 * this.getMaxEnginePower());
        });
        $('#btnDown').on('mouseup touchend', (e)=>{
            this.setEnginePower(0);
        });
        
        $('#btnLeft').on('mousedown touchstart', (e)=>{
            this.setTurnStrength(-1 * this.getTurnStrength());
        });
        $('#btnLeft').on('mouseup touchend', (e)=>{
            this.setTurnStrength(0);
        });
        
        $('#btnRight').on('mousedown touchstart', (e)=>{
            this.setTurnStrength(1 * this.getTurnStrength());
        });
        $('#btnRight').on('mouseup touchend', (e)=>{
            this.setTurnStrength(0);
        });
    }*/
}