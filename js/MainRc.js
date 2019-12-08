
class MainRc
{
    constructor(host, plugins){
        this.plugins = plugins;
        this.joystickOnX = false;
        this.joystickOnY = false;
        this.arrKeys = [];
        this.meterSpeed = null;
        this.meterTurn = null;
        this.meterTemp = null;
        this.connect();
        this.initEvents();
        this.data = {
        };
    }
    
    isActive(){
        return this.socket.readyState === 1;
    }
    
    initEvents()
    {
        console.log('initEvents1');
        $( document ).ready(()=> {
            console.log('initEvents');
            
            this.plugins.forEach((plugin)=>{
                if (plugin.init && typeof plugin.init === "function") {
                    plugin.init();
                }
            });

            this.initMeters();
            this.initJoysticks();
            this.initButtons();
            
            $( document ).on("keyup", (e)=>{
                var index = this.arrKeys.indexOf(e.keyCode);
                if (index > -1) {
                  this.arrKeys.splice(index, 1);
                  this.getFromKeys();
                  this.onKeyUp(this.arrKeys);
                }
            });
            $( document ).on("keydown", (e)=>{
                if(this.arrKeys.indexOf(e.keyCode) < 0){
                    this.arrKeys.push(e.keyCode);
                    this.onKeyDown(this.arrKeys);
                }
            });
        });
    }

    initButtons(){
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
    }
    
    getMaxEnginePower(){
        return $('#speed').val();
    }
    
    getTurnStrength(){
        return $('#turn').val();
    }
    
    setEnginePower(power){
       $('#current_speed').val(power).trigger('change'); 
    }
    
    setTurnStrength(turn){
        $('#current_turn').val( turn ).trigger('change');
    }
    
    initJoysticks(){
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
    
    sendData(){
        setTimeout(()=>{
            if( this.shouldSend() ) {
                this.getFromKeys();
                let data = this.makeCmd();
                this.socket.send(JSON.stringify(data));
            }
            this.sendData();
        }, 100);
    }
        
    shouldSend()
    {
        let shouldSendData = false;
        this.plugins.forEach((plugin)=>{
            if (plugin.shouldSend && typeof plugin.shouldSend === "function") {
                shouldSendData = shouldSendData || plugin.shouldSend();
            }
        });

        return  shouldSendData ||
                this.arrKeys.indexOf(38) >= 0 || 
                this.arrKeys.indexOf(40) >= 0 ||
                this.arrKeys.indexOf(37) >= 0 ||
                this.arrKeys.indexOf(39) >= 0 ||
                this.arrKeys.indexOf(72) >= 0 ||
                this.joystickOnY ||
                this.joystickOnX;
    }
    
    makeCmd(){
        let speed = $('#current_speed').val();
        let turn = $('#current_turn').val();

        let pluginsData = {};
        this.plugins.forEach((plugin)=>{
            if (plugin.createDataToSend && typeof plugin.createDataToSend === "function") {
                let data = plugin.createDataToSend();
                pluginsData = $.extend(pluginsData, data);
            }
        });

        return {
            speed: speed,
            turn: turn,
            plugins: pluginsData
        };
    }
    
    getFromKeys(){
        let speed = 0;
        let turn = 0;
        let bSpeed = false;
        let bTurn = false;
        let speedVal = $('#speed').val();
        if( this.arrKeys.indexOf(16) >= 0 ){
            speedVal = 100;
        }
        if( this.arrKeys.indexOf(38) >= 0 ){
            speed = -1 * speedVal;
            bSpeed = true;
        }
        if( this.arrKeys.indexOf(40) >= 0 ){
            speed = 1 * speedVal;
            bSpeed = true;
        }
        if( this.arrKeys.indexOf(37) >= 0 ){
            turn = -1 * $('#turn').val();
            bTurn = true;
        }
        if( this.arrKeys.indexOf(39) >= 0 ){
            turn = 1 * $('#turn').val();
            bTurn = true;
        }
        
        if(bSpeed){
            $('#current_speed').val(speed).trigger('change');
        }else{
            $('#current_speed').val(0).trigger('change');
        }
        if(bTurn){
            $('#current_turn').val(turn).trigger('change');
        }else{
            $('#current_turn').val(0).trigger('change');
        }
    }
    
    getDefaultsMeter(){
        return {
            min: -100,
            max: 100,
            minTxt: "min",
            maxTxt: "max",
            donut: false,
            gaugeWidthScale: 0.6,
            counter: true,
            hideInnerShadow: true,
            pointer: true,
            pointerOptions: {
                toplength: 5,
                bottomlength: 15,
                bottomwidth: 2
            },
            startAnimationTime: 200,
            refreshAnimationTime: 200,
            levelColors: [
                "#99ff33",
                "#ffff66",
                "#ff3300"
              ]
          }
    }
    
    initMeters(){
        this.meterSpeed = new JustGage({
            id: 'meterEnginePower',
            value: 0,
            title: 'engine power',
            label: "engine power",
            symbol: '%',
            defaults: this.getDefaultsMeter(),
        });
          
        this.meterTurn = new JustGage({
            id: 'meterTurnStrength',
            value: 0,
            title: 'turn strength',
            label: "turn strength",
            symbol: '%',
            defaults: this.getDefaultsMeter()
        });

        this.meterTemp = new JustGage({
            id: 'meterTemp',
            value: 0,
            title: 'temp cpu',
            label: "temp cpu",
            symbol: 'C'
        });

        $('#current_speed').on('change', (e)=>{
            this.meterSpeed.refresh(-1 * $(e.currentTarget).val());
        });

        $('#current_turn').on('change', (e)=>{
            this.meterTurn.refresh(1 * $(e.currentTarget).val());
        });
    }
    
    connect(){
        this.socket = new WebSocket(host);
        this.connectionStatus(3);
        
        this.socket.onopen = (e) => {
            $('#info').html('connected');
            this.connectionStatus(1);
            this.sendData();
        }
        this.socket.onerror = (e) => {
            $('#info').html('error');
        }
        this.socket.onclose = (e) => {
            $('#info').html('close');
            this.connectionStatus(2);
        }
        this.socket.onmessage = (e) => {
            $('#res').html(e.data);
            let data = JSON.parse(e.data);
            this.log(JSON.stringify(data.temp));
            this.onMessage(data);
            if(typeof data.temp!== 'undefined'){
                this.meterTemp.refresh(data.temp);
            }
        };
    }
    
    connectionStatus(status){
        switch(status){
            case 1: 
                $('#infoSuccess').removeClass('badge-danger badge-warning').addClass('badge-success');
                $('#infoSuccess').text('Connected');
                $( document ).trigger( "rc_connected");
                break;
            case 2:
                $('#infoSuccess').removeClass('badge-success badge-warning').addClass('badge-danger');
                $('#infoSuccess').text('Disconnected');
                $( document ).trigger( "rc_disconnected");
                break;
            case 3:
                $('#infoSuccess').removeClass('badge-danger badge-success').addClass('badge-warning');
                $('#infoSuccess').text('Connecting');
                break;
        }
    }
    
    log(str){
        //console.log(str);
    }
    
    onMessage(data)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onMessage && typeof plugin.onMessage === "function") {
                plugin.onMessage(data);
            }
        });
    }

    onKeyUp()
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onKeyUp && typeof plugin.onKeyUp === "function") {
                plugin.onKeyUp(this.arrKeys);
            }
        });
    }

    onKeyDown()
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onKeyDown && typeof plugin.onKeyDown === "function") {
                plugin.onKeyDown(this.arrKeys);
            }
        });
    }
}
