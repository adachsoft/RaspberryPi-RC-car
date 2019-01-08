<?php
    $version = include './version.php';
    $urlStream = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . ':8080/stream/video.mjpeg';
    $host = $_SERVER['HTTP_HOST'];
?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RaspberryPi RC car - <?php $version['appVersion']; ?></title>
    
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/gafhyb/justgage/raphael-2.1.4.min.js"></script>
    <script src="vendor/gafhyb/justgage/justgage.js"></script>
    <script src="/node_modules/nipplejs/dist/nipplejs.js"></script>
    <script src="js/MainRc.js"></script>
    <script>
        var host = 'ws://<?php echo $host ?>:8000/websockets.php';
        var RcCar = new MainRc(host);
    </script>
</head>
<body>
    <?php /*<img src="<?php echo $urlStream; ?>" />*/ ?>
    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <span class="badge badge-pill badge badge-warning" id="infoSuccess">Connecting</span>
            </div>
            <div class="col-sm-5 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max engine power[%]:</span>
                </div>
                <input type="text" name="speed" id="speed" value="60" class="form-control">
            </div>
            <div class="col-sm-5 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max turn strength[%]:</span>
                </div>
                <input type="text" name="turn" id="turn" value="70" class="form-control">
            </div>
        </div>
    </div>
    <div id="info"></div>
    <div id="res"></div>
    <hr>
    
    <div style="display: none;">
        CURRENT SPEED:<input type="text" name="current_speed" id="current_speed" value="60">%<br>
        CURRENT TURN:<input type="text" name="current_turn" id="current_turn" value="70">%<br>
    </div>
    
    <div class="container">
        <div id="meterEnginePower" class="gauge" data-value="0"></div>
        <div id="meterTurnStrength" class="gauge" data-value="0"></div>
        <div id="meterTemp" class="gauge" data-value="0"></div>
    </div>
    
    <div id="con">
        <div id="left"></div>
        <div id="right"></div>
    </div>
</body>
</html>
