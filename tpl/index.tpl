<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RaspberryPi RC car - {$VERSION}</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="vendor/components/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/gafhyb/justgage/raphael-2.1.4.min.js"></script>
    <script src="vendor/gafhyb/justgage/justgage.js"></script>
    <script src="/node_modules/nipplejs/dist/nipplejs.js"></script>
    <script src="js/MainRc.js?t={$TIME}"></script>
    <script>
        var host = 'ws://{$HOST}:8000/websockets.php?t={$TIME}';
        var rcCar = new MainRc(host);
        
        function save(){
            $.ajax({
                type: "POST",
                url: 'save.php',
                data: {
                    config_type: 'config',
                    config: {
                        maxEnginePower: $('#speed').val(),
                        maxTurnStrength: $('#turn').val(),
                    }
                },
            }).done((res)=>{
                console.log('SAVE: ' + res);
            });
        }
        
        function snapshot(){
            $.ajax({
                type: "POST",
                url: 'snapshot.php',
            }).done((res)=>{
                console.log('SAVE: ' + res);
            });
        }
        
        $( document ).ready(()=> {
            $('#speed').on('change', ()=>{
                console.log('change');
                save();
            });
            $('#turn').on('change', ()=>{
                console.log('change');
                save();
            });
            $('#snapshot').on('click', ()=>{
                snapshot();
            });
        });
        
    </script>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-1">
                <span class="badge badge-pill badge badge-warning" id="infoSuccess">Connecting</span>
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max engine power[%]:</span>
                </div>
                <input type="text" name="speed" id="speed" value="{$CONFIG->get('maxEnginePower')}" class="form-control-sm inputInt">
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max turn strength[%]:</span>
                </div>
                <input type="text" name="turn" id="turn" value="{$CONFIG->get('maxTurnStrength')}" class="form-control-sm inputInt">
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                {if $CONFIG->get('camera')}
                <button type="button" class="btn btn-sm btn-success" id="snapshot">Snapshot</button>
                {/if}
            </div>
        </div>
    </div>
    <div style="display: none;">
        <div id="info"></div>
        <div id="res"></div>
    </div>
    <hr class="m-0">
    
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#tabMain" role="tab" aria-controls="home" aria-selected="true">
                <i class="fas fa-gamepad"></i>&nbsp;
                Main
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tabConfig" role="tab" aria-controls="profile" aria-selected="false">
                <i class="fas fa-arrows-alt"></i>&nbsp;
                Configuration
            </a>
        </li>
        {if $CONFIG->get('camera')}
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tabSnapshots" role="tab" aria-controls="profile" aria-selected="false">
                <i class="fas fa-arrows-alt"></i>&nbsp;
                Snapshots
            </a>
        </li>
        {/if}
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tabMain" role="tabpanel" aria-labelledby="home-tab">
            {include file='tabMain.tpl'}
        </div>
        <div class="tab-pane fade" id="tabConfig" role="tabpanel" aria-labelledby="profile-tab">
            {include file='tabConfig.tpl'}
        </div>
        <div class="tab-pane fade" id="tabSnapshots" role="tabpanel" aria-labelledby="profile-tab">
            {include file='tabSnapshots.tpl'}
        </div>
    </div>
</body>
</html>
