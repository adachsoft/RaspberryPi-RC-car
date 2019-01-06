<?php
    $urlStream = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . ':8080/stream/video.mjpeg';
    $host = $_SERVER['HTTP_HOST'];
?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title of the document</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
    <style>
        html, body {
            padding: 0;
            margin: 0;
        }
        #con {
            position: fixed;
            /*top: 0;*/
            left: 0;
            right: 0;
            bottom: 0;
            height: 30vh;
            padding: 0;
            margin: 0;
            background-color: rgba(100, 50, 0, 0.3);
        }
        #left {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 50%;
            background: rgba(0, 255, 0, 0.1);
        }
        #right {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 50%;
            background: rgba(0, 0, 255, 0.1);
        }
        
        .container {
            width: 600px;
            margin: 10px auto;
            text-align: center;
          }
        .gauge {
          width: 150px;
          height: 150px;
          display: inline-block;
        }

    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="vendor/gafhyb/justgage/raphael-2.1.4.min.js"></script>
    <script src="vendor/gafhyb/justgage/justgage.js"></script>
    <script>
        var meterSpeed = null;
        var meterTurn = null;
        var joystickOnX = false;
        var joystickOnY = false;
        var arrKeys = [];
        var host = 'ws://<?php echo $host ?>:8000/websockets.php';
        var socket = new WebSocket(host);
        $('#disconnect').on('click', (e)=>{
            socket.close();
        });
        socket.onopen = (e) => {
            $('#info').html('connected');
            $('#disconnect').removeAttr('disabled');
            sendData();
        }
        socket.error = (e) => {
            $('#info').html('error');
        }
        socket.close = (e) => {
            $('#info').html('close');
            $('#disconnect').attr('disable', 'disable');
        }
        socket.onmessage = function(e) {
            $('#res').html(e.data);
        };
        $( document ).ready(function() {
            initf();
            $( document ).on("keyup", (e)=>{
                var index = arrKeys.indexOf(e.keyCode);
                if (index > -1) {
                  arrKeys.splice(index, 1);
                  getFromKeys();
                }
                console.log('keyup: ' + JSON.stringify(arrKeys));
            });
            $( document ).on("keydown", (e)=>{
                if(arrKeys.indexOf(e.keyCode) < 0){
                    arrKeys.push(e.keyCode);
                }
                console.log('keydown: ' + JSON.stringify(arrKeys));
                console.log( 'K: ' +  arrKeys.indexOf(38) );
            });
        });
        
        function initf(){
            var dflt = {
                min: 0,
                max: 100,
                minTxt: "min",
                maxTxt: "max",
                symbol: '%',
                donut: true,
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
              meterSpeed = new JustGage({
                id: 'gg1',
                value: 0,
                title: 'engine power',
                label: "engine power",
                defaults: dflt,
              });
              meterTurn = new JustGage({
                id: 'gg2',
                title: 'turn strength',
                label: "turn strength",
                defaults: dflt
              });
              
              $('#current_speed').on('change', (e)=>{
                  meterSpeed.refresh(Math.abs($(e.currentTarget).val()));
              });
              
              $('#current_turn').on('change', (e)=>{
                  meterTurn.refresh(Math.abs($(e.currentTarget).val()));
              });
        }
        
        function sendData(){
            setTimeout(()=>{
                if( shouldSend() ) {
                    getFromKeys();
                    let data = makeCmd();
                    //console.log(JSON.stringify(data));
                    socket.send(JSON.stringify(data));
                }
                sendData();
            }, 100);
        }
        
        function shouldSend(){
            return arrKeys.indexOf(38) >= 0 || 
                    arrKeys.indexOf(40) >= 0 ||
                    arrKeys.indexOf(37) >= 0 ||
                    arrKeys.indexOf(39) >= 0 ||
                    joystickOnY ||
                    joystickOnX;
        }
        
        function getFromKeys(){
            let speed = 0;
            let turn = 0;
            let bSpeed = false;
            let bTurn = false;
            let speedVal = $('#speed').val();
            if( arrKeys.indexOf(16) >= 0 ){
                speedVal = 100;
            }
            if( arrKeys.indexOf(38) >= 0 ){
                speed = -1 * speedVal;
                bSpeed = true;
            }
            if( arrKeys.indexOf(40) >= 0 ){
                speed = 1 * speedVal;
                bSpeed = true;
            }
            if( arrKeys.indexOf(37) >= 0 ){
                turn = -1 * $('#turn').val();
                bTurn = true;
            }
            if( arrKeys.indexOf(39) >= 0 ){
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
        
        function makeCmd(){
            let speed = $('#current_speed').val();
            let turn = $('#current_turn').val();
            return {
                speed: speed,
                turn: turn,
                l: 5,
            };
        }
    </script>
</head>
<body>
    <?php /*<img src="<?php echo $urlStream; ?>" />*/ ?>
    <button type="button" id="disconnect" disabled>disconnect</button><br>
    SPEED:<input type="text" name="speed" id="speed" value="60">%<br>
    TURN:<input type="text" name="turn" id="turn" value="70">%<br>
    <hr>
    <div style="display: none;">
        CURRENT SPEED:<input type="text" name="current_speed" id="current_speed" value="60">%<br>
        CURRENT TURN:<input type="text" name="current_turn" id="current_turn" value="70">%<br>
    </div>
    <div id="info"></div>
    <div id="res"></div>
    
    <div class="container">
        <div id="gg1" class="gauge"></div>
        <div id="gg2" class="gauge" data-value="25"></div>
    </div>
    
    <div id="con">
        <div id="left"></div>
        <div id="right"></div>
    </div>
    
    <script src="/node_modules/nipplejs/dist/nipplejs.js"></script>
    <script>
        var joystickL = nipplejs.create({
            zone: document.getElementById('left'),
            mode: 'static',
            position: { left: '20%', top: '50%' },
            color: 'green',
            size: 200
        });
        var joystickR = nipplejs.create({
            zone: document.getElementById('right'),
            mode: 'static',
            position: { left: '80%', top: '50%' },
            color: 'red',
            size: 200
        });

        joystickL.on('start', function (evt, data) {
            joystickOnX = true;
        });

        joystickL.on('end', function (evt, data) {
            joystickOnX = false;
            $('#current_turn').val( 0 );
        });

        joystickL.on('move', function (evt, data) {
            //console.log( 'L: ' + JSON.stringify(data) );
            //console.log( 'L: ' + JSON.stringify(data.instance.frontPosition) );
            if( data.instance.frontPosition.x > 10 ){
                $('#current_turn').val( $('#turn').val() );
            }else if( data.instance.frontPosition.x < -10 ){
                $('#current_turn').val( -1 * $('#turn').val() ).trigger('change');
            }else{
                $('#current_turn').val(0).trigger('change');
            }
            //$('#current_turn').val( data.instance.frontPosition.x );
        });

        joystickR.on('start', function (evt, data) {
            //console.log( 'START');
            joystickOnY = true;
        });

        joystickR.on('end', function (evt, data) {
            //console.log( 'END');
            //console.log( 'SL: ' + JSON.stringify(data) );
            //$('#current_turn').val( 0 );
            $('#current_speed').val( 0 ).trigger('change');
            joystickOnY = false;
        });

        joystickR.on('move', function (evt, data) {
            //console.log( 'L: ' + JSON.stringify(data) );
            //console.log( 'L: ' + JSON.stringify(data.instance.frontPosition) );
            //$('#current_turn').val( data.instance.frontPosition.x );
            $('#current_speed').val( data.instance.frontPosition.y ).trigger('change');
        });

    </script>
    
</body>
</html>
